import { Injectable, computed, inject, signal } from '@angular/core';
import { WarehouseApiService } from './warehouse-api.service';
import { ThreeSceneService, SCENE_PALETTE } from './three-scene.service';
import { AnimationService } from './animation.service';
import {
  AlgorithmType,
  FeedEventItem,
  SearchResult,
  TraceEvent,
  WarehouseScenario,
} from '../models/warehouse.model';

@Injectable({
  providedIn: 'root',
})
export class SimulationStoreService {
  private readonly api = inject(WarehouseApiService);
  private readonly scene = inject(ThreeSceneService);
  private readonly animation = inject(AnimationService);

  // Core State Signals
  readonly scenario = signal<WarehouseScenario | null>(null);
  readonly selectedAlgorithm = signal<AlgorithmType>('astar');
  readonly isRunning = signal<boolean>(false);
  readonly playbackSpeed = signal<number>(2); // 1 = 0.5x, 2 = 1x, 3 = 2x, 4 = 4x
  readonly showFrontier = signal<boolean>(true);
  readonly showLabels = signal<boolean>(false);

  // Active Telemetry & Trace Signals
  readonly currentResult = signal<SearchResult | null>(null);
  readonly activeStep = signal<number>(0);
  readonly totalSteps = signal<number>(0);
  readonly activeEvent = signal<TraceEvent | null>(null);
  readonly feedEvents = signal<FeedEventItem[]>([]);
  readonly comparisonData = signal<SearchResult[]>([]);

  // System Status Signals
  readonly systemStatus = signal<'ready' | 'running' | 'complete' | 'error'>('ready');
  readonly statusMessage = signal<string>('Select an algorithm, then start the simulation.');
  readonly stepLabel = signal<string>('Awaiting run');
  readonly trolleyActive = signal<boolean>(false);

  // Computed Values
  readonly moves = computed(() => this.currentResult()?.moves ?? 0);
  readonly totalCost = computed(() => this.currentResult()?.totalCost ?? 0);
  readonly nodesExpanded = computed(() => this.currentResult()?.nodesExpanded ?? 0);
  readonly elapsedMs = computed(() => this.currentResult()?.elapsedMs ?? 0);
  readonly goalReached = computed(() => this.currentResult()?.reached ?? false);
  readonly isAstar = computed(() => this.selectedAlgorithm() === 'astar');

  readonly speedLabel = computed(() => {
    switch (this.playbackSpeed()) {
      case 1:
        return '0.5×';
      case 2:
        return '1.0×';
      case 3:
        return '2.0×';
      case 4:
        return '4.0×';
      default:
        return '1.0×';
    }
  });

  private getStepDelay(): number {
    return [400, 200, 90, 25][this.playbackSpeed() - 1];
  }

  private getDriveDelay(): number {
    return [160, 90, 45, 18][this.playbackSpeed() - 1];
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  init(): void {
    this.api.getScenario().subscribe({
      next: (scenario) => {
        this.scenario.set(scenario);
        this.scene.buildWarehouse(scenario, this.showLabels());
        this.loadComparison();
      },
      error: () => {
        this.systemStatus.set('error');
        this.statusMessage.set('Could not connect to simulation server. Verify server.py is running.');
      },
    });
  }

  loadComparison(): void {
    this.api.getResults().subscribe({
      next: ({ results }) => this.comparisonData.set(results),
      error: () => console.warn('Could not load comparison metrics'),
    });
  }

  selectAlgorithm(algo: AlgorithmType): void {
    if (this.isRunning()) return;
    this.selectedAlgorithm.set(algo);
    this.statusMessage.set(`Selected ${algo.toUpperCase()}. Ready to run.`);
    this.stepLabel.set('Strategy configured');
  }

  setSpeed(speed: number): void {
    this.playbackSpeed.set(speed);
  }

  toggleFrontier(show: boolean): void {
    this.showFrontier.set(show);
  }

  toggleLabels(show: boolean): void {
    this.showLabels.set(show);
    this.scene.toggleLabels(show);
  }

  resetCamera(): void {
    this.scene.resetCamera();
  }

  topCamera(): void {
    this.scene.topCamera();
  }

  async runSelected(): Promise<void> {
    if (this.isRunning()) return;

    this.isRunning.set(true);
    this.systemStatus.set('running');
    this.trolleyActive.set(false);
    this.feedEvents.set([]);
    this.scene.clearOverlays();
    this.scene.resetRobotBeacon();
    this.scene.setTrolley([0, 0], false);
    if (this.scenario()) {
      this.scene.setRobotPosition(this.scenario()!.start);
    }

    const algo = this.selectedAlgorithm();
    this.statusMessage.set(`Computing ${algo === 'astar' ? 'A*' : algo.toUpperCase()} state-space search...`);

    this.api.runAlgorithm(algo).subscribe({
      next: async (result) => {
        this.currentResult.set(result);
        this.totalSteps.set(result.trace.length);

        // 1. Animate search wavefront
        await this.animateTrace(result);

        // 2. Commit the route
        this.scene.clearOverlays();
        this.scene.drawPath(result.path, SCENE_PALETTE.route);

        // 3. Physically drive the robot along the committed path to destination!
        if (result.reached) {
          this.stepLabel.set(`${result.algorithm.toUpperCase()} Route Committed · Robot in Transit`);
          await this.scene.driveRobot(result.path, this.getDriveDelay(), (pos, idx) => {
            this.statusMessage.set(
              `AMR in transit: step ${idx + 1} of ${result.moves} at [${pos.join(', ')}].`
            );
          });
          this.scene.celebrateGoal();
          this.stepLabel.set('Delivery Complete · Goal Reached');
          this.statusMessage.set(
            `${result.algorithm.toUpperCase()} successfully delivered to Dispatch [${this.scenario()?.goal.join(', ')}]! Moves: ${result.moves}, Total Cost: ${result.totalCost}.`
          );
        }

        this.isRunning.set(false);
        this.systemStatus.set('complete');
      },
      error: () => {
        this.isRunning.set(false);
        this.systemStatus.set('error');
        this.statusMessage.set('Search execution failed on backend.');
      },
    });
  }

  private async animateTrace(result: SearchResult): Promise<void> {
    const reduced = this.animation.isReducedMotion();
    const stride = reduced ? Math.max(1, Math.ceil(result.trace.length / 8)) : 1;

    for (let i = 0; i < result.trace.length; i += stride) {
      if (!this.isRunning()) break;
      const event = result.trace[i];
      this.activeStep.set(i + 1);
      this.activeEvent.set(event);

      this.scene.renderTraceEvent(event, this.showFrontier());

      const scores = event.scores?.[0];
      const detail =
        scores && ['greedy', 'astar'].includes(this.selectedAlgorithm())
          ? `Score: g=${scores.g}, h=${scores.h}${scores.f != null ? `, f=${scores.f}` : ''}`
          : `${event.considered.length} candidate${event.considered.length === 1 ? '' : 's'} · ${event.frontier.length} waiting`;

      this.feedEvents.update((events) => [
        ...events,
        {
          index: event.step + 1,
          current: event.current,
          detail,
          scores,
        },
      ]);

      this.stepLabel.set(`Decision ${event.step + 1} of ${result.trace.length}`);
      this.statusMessage.set(
        `Expanding [${event.current.join(', ')}]; ${event.frontier.length} cells in frontier.`
      );

      await this.sleep(reduced ? 15 : this.getStepDelay());
    }
  }

  async runTrolley(): Promise<void> {
    if (this.isRunning()) return;

    this.isRunning.set(true);
    this.systemStatus.set('running');
    this.trolleyActive.set(true);
    this.selectedAlgorithm.set('astar');
    this.feedEvents.set([]);
    this.scene.clearOverlays();
    this.scene.resetRobotBeacon();
    this.scene.setTrolley([0, 0], false);
    if (this.scenario()) {
      this.scene.setRobotPosition(this.scenario()!.start);
    }

    this.stepLabel.set('Phase 1: Initial Dispatch Route (A*)');
    this.statusMessage.set(
      `Computing initial optimal route. The trolley at [${this.scenario()?.trolley.join(', ')}] is unmapped and omitted from the robot's known map.`
    );

    this.api.runTrolley().subscribe({
      next: async (data) => {
        // Step 1: Draw the initial planned A* path in cyan ghost beam
        this.scene.drawPath(data.original.path, SCENE_PALETTE.frontier);
        this.stepLabel.set(
          `Phase 1: Initial Plan Committed · ${data.original.moves} Moves · Cost ${data.original.totalCost}`
        );
        this.statusMessage.set(
          `Initial plan committed: ${data.original.moves} moves, cost ${data.original.totalCost}. Robot departing from Packing Station [${this.scenario()?.start.join(', ')}].`
        );
        await this.sleep(700);

        // Step 2: The robot ACTUALLY DRIVES step-by-step along the path toward the detection point!
        this.stepLabel.set('Phase 2: Robot in Transit along Planned Route');
        await this.scene.driveRobot(data.travelled, this.getDriveDelay(), (pos, idx) => {
          this.statusMessage.set(
            `AMR navigating: waypoint ${idx + 1} of ${data.travelled.length} at [${pos.join(', ')}].`
          );
        });

        // Step 3: Proximity Obstacle Detection (1 Cell Ahead!)
        this.scene.showObstacleAlert(data.trolley, data.detectedAt);
        this.stepLabel.set('Phase 3: Obstacle Detected 1 Cell Ahead!');
        this.statusMessage.set(
          `PROXIMITY WARNING: Unmapped trolley detected at [${data.trolley.join(', ')}] (Distance = ${data.distanceToBlockedCell} cell). Robot halted at [${data.detectedAt.join(', ')}]. Updating belief map.`
        );

        this.feedEvents.update((events) => [
          ...events,
          {
            index: 1,
            current: data.detectedAt,
            detail: `HALT: Proximity sensor detected unmapped trolley at [${data.trolley.join(', ')}]. Map updated: blocked={[${data.trolley.join(', ')}]}. Triggering online A* replan.`,
          },
        ]);
        await this.sleep(1400);

        // Step 4: Online A* search wavefront from the robot's current position.
        this.stepLabel.set(`Phase 4: Online A* Replanning from [${data.detectedAt.join(', ')}]`);
        this.statusMessage.set(
          `A* searching state space from current position [${data.detectedAt.join(', ')}] with [${data.trolley.join(', ')}] blocked...`
        );

        this.currentResult.set({
          algorithm: 'astar_replan',
          reached: data.goalReached,
          path: data.combinedPath,
          moves: data.moves,
          totalCost: data.totalCost,
          nodesExpanded: data.nodesExpanded,
          elapsedMs: data.revised.elapsedMs,
          trace: data.revised.trace,
          replans: data.replans,
          trolley: data.trolley,
          detectedAt: data.detectedAt,
        });

        await this.animateTrace(data.revised);

        // Step 5: Draw the combined route (travelled in cyan, detour in gold)
        this.scene.clearOverlays();
        this.scene.setTrolley(data.trolley, true);
        this.scene.overlayCell(data.trolley, SCENE_PALETTE.restricted, 0.88, 0.1);
        this.scene.drawPath(data.travelled, SCENE_PALETTE.frontier);
        this.scene.drawPath(data.revised.path, SCENE_PALETTE.route);

        if (data.goalReached) {
          this.stepLabel.set('Phase 5: Detour Committed · Executing Revised Route');
          this.statusMessage.set(
            `Detour confirmed through an open bypass. Circumventing trolley at [${data.trolley.join(', ')}].`
          );
          await this.sleep(600);

          // Step 6: Robot DRIVES along the revised detour path all the way to the goal!
          await this.scene.driveRobot(data.revised.path, this.getDriveDelay(), (pos, idx) => {
            this.statusMessage.set(
              `AMR executing detour: waypoint ${idx + 1} of ${data.revised.path.length} at [${pos.join(', ')}].`
            );
          });

          // Step 7: Goal Reached Celebration!
          this.scene.celebrateGoal();
          this.stepLabel.set(`Mission Complete · 1 Replan · Goal Reached!`);
          this.statusMessage.set(
            `Delivered to Dispatch [${this.scenario()?.goal.join(', ')}]! Total journey: ${data.moves} moves, total cost: ${data.totalCost} (1 Replan).`
          );
        } else {
          this.stepLabel.set('Replan Failed · No Alternative Route Exists');
          this.statusMessage.set(
            'A* search exhausted: no feasible path exists from current position to destination.'
          );
        }

        this.isRunning.set(false);
        this.systemStatus.set('complete');
        this.loadComparison();
      },
      error: () => {
        this.isRunning.set(false);
        this.systemStatus.set('error');
        this.statusMessage.set('Dynamic trolley experiment failed on backend.');
      },
    });
  }
}
