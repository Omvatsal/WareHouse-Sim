import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulationStoreService } from '../../core/services/simulation-store.service';
import { AlgorithmType } from '../../core/models/warehouse.model';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="control-panel" aria-label="Simulation configuration and triggers">
      <!-- Section: Search Algorithm -->
      <section class="panel-section">
        <header class="section-header">
          <span class="section-eyebrow">Search Protocol</span>
          <h2>Algorithm Strategy</h2>
        </header>

        <div class="algorithm-grid" role="group" aria-label="Select search algorithm">
          <button
            type="button"
            class="algo-card"
            [class.active]="store.selectedAlgorithm() === 'astar'"
            (click)="store.selectAlgorithm('astar')"
            [disabled]="store.isRunning()"
          >
            <div class="algo-title-row">
              <span class="algo-name">A* Search</span>
              <span class="algo-tag optimal">Optimal</span>
            </div>
            <p class="algo-desc">Minimizes path cost using f(n) = g(n) + h(n)</p>
          </button>

          <button
            type="button"
            class="algo-card"
            [class.active]="store.selectedAlgorithm() === 'bfs'"
            (click)="store.selectAlgorithm('bfs')"
            [disabled]="store.isRunning()"
          >
            <div class="algo-title-row">
              <span class="algo-name">BFS</span>
              <span class="algo-tag">Fewest Hops</span>
            </div>
            <p class="algo-desc">FIFO level-order queue; ignores terrain cost</p>
          </button>

          <button
            type="button"
            class="algo-card"
            [class.active]="store.selectedAlgorithm() === 'greedy'"
            (click)="store.selectAlgorithm('greedy')"
            [disabled]="store.isRunning()"
          >
            <div class="algo-title-row">
              <span class="algo-name">Greedy Best</span>
              <span class="algo-tag">Heuristic</span>
            </div>
            <p class="algo-desc">Follows h(n) distance; vulnerable to cost traps</p>
          </button>

          <button
            type="button"
            class="algo-card"
            [class.active]="store.selectedAlgorithm() === 'dfs'"
            (click)="store.selectAlgorithm('dfs')"
            [disabled]="store.isRunning()"
          >
            <div class="algo-title-row">
              <span class="algo-name">DFS</span>
              <span class="algo-tag">Deep First</span>
            </div>
            <p class="algo-desc">LIFO stack traversal; non-optimal depth probe</p>
          </button>
        </div>
      </section>

      <!-- Section: Action Triggers -->
      <section class="panel-section actions">
        <button
          type="button"
          class="btn-secondary"
          (click)="store.generateRandomScenario()"
          [disabled]="store.isRunning()"
          aria-label="Generate a new random warehouse grid"
        >
          <span aria-hidden="true">⤨</span>
          <span>Generate Random Grid</span>
        </button>

        <button
          type="button"
          class="btn-primary"
          (click)="store.runSelected()"
          [disabled]="store.isRunning()"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span>Run {{ store.selectedAlgorithm() === 'astar' ? 'A*' : store.selectedAlgorithm().toUpperCase() }} Search</span>
        </button>

        <button
          type="button"
          class="btn-secondary"
          (click)="store.runTrolley()"
          [disabled]="store.isRunning()"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>Simulate Hidden Trolley Event</span>
        </button>
      </section>

      <!-- Section: Viewport Overlays -->
      <section class="panel-section overlays">
        <header class="section-header">
          <span class="section-eyebrow">Scene Layers</span>
          <h3>Visual Overlays</h3>
        </header>

        <label class="switch-row">
          <div class="switch-meta">
            <span class="switch-title">Decision Frontier</span>
            <span class="switch-sub">Highlight queued search nodes in teal</span>
          </div>
          <input
            type="checkbox"
            [checked]="store.showFrontier()"
            (change)="store.toggleFrontier($any($event.target).checked)"
          />
          <span class="slider"></span>
        </label>

        <label class="switch-row">
          <div class="switch-meta">
            <span class="switch-title">Cell Coordinates</span>
            <span class="switch-sub">Display [row, col] reference sprites</span>
          </div>
          <input
            type="checkbox"
            [checked]="store.showLabels()"
            (change)="store.toggleLabels($any($event.target).checked)"
          />
          <span class="slider"></span>
        </label>
      </section>

      <!-- Section: Terrain Legend -->
      <section class="panel-section legend">
        <header class="section-header">
          <span class="section-eyebrow">Map Reference</span>
          <h3>Terrain Classification</h3>
        </header>

        <div class="legend-grid">
          <div class="legend-item">
            <span class="swatch normal"></span>
            <span>Open Aisle (Cost 1)</span>
          </div>
          <div class="legend-item">
            <span class="swatch crowded"></span>
            <span>Crowded (Cost 4)</span>
          </div>
          <div class="legend-item">
            <span class="swatch shelf"></span>
            <span>Storage Rack</span>
          </div>
          <div class="legend-item">
            <span class="swatch restricted"></span>
            <span>Hazard Barrier</span>
          </div>
          <div class="legend-item">
            <span class="swatch frontier"></span>
            <span>Active Frontier</span>
          </div>
          <div class="legend-item">
            <span class="swatch route"></span>
            <span>Committed Route</span>
          </div>
        </div>
      </section>
    </aside>
  `,
  styles: [`
    .control-panel {
      padding: var(--space-5);
      background: var(--surface-card);
      border-right: 1px solid var(--border-subtle);
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
    }

    .panel-section {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .section-eyebrow {
      font-size: 11px;
      font-family: var(--font-mono);
      color: var(--accent-frontier);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: block;
      margin-bottom: 2px;
    }

    .section-header h2 {
      font-size: 15px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .section-header h3 {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .algorithm-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-2);
    }

    .algo-card {
      padding: var(--space-3);
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      text-align: left;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 4px;
      transition: all 0.18s ease;
    }

    .algo-card:hover:not(:disabled) {
      border-color: var(--border-hover);
      background: var(--surface-subtle);
    }

    .algo-card.active {
      border-color: var(--accent-frontier);
      background: rgba(45, 212, 191, 0.08);
      box-shadow: inset 0 0 0 1px rgba(45, 212, 191, 0.2);
    }

    .algo-card:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .algo-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .algo-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .algo-tag {
      font-size: 10px;
      font-family: var(--font-mono);
      padding: 1px 5px;
      border-radius: var(--radius-sm);
      background: rgba(255, 255, 255, 0.06);
      color: var(--text-tertiary);
    }

    .algo-tag.optimal {
      background: rgba(45, 212, 191, 0.15);
      color: var(--accent-frontier);
    }

    .algo-desc {
      font-size: 11px;
      color: var(--text-secondary);
      line-height: 1.35;
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      padding: var(--space-2) 0;
    }

    .btn-primary, .btn-secondary {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      border-radius: var(--radius-sm);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.18s ease;
    }

    .btn-primary {
      background: var(--accent-frontier);
      color: #051b1c;
      border: none;
      box-shadow: var(--shadow-glow-teal);
    }

    .btn-primary:hover:not(:disabled) {
      background: #5eead4;
      transform: translateY(-1px);
    }

    .btn-primary:disabled, .btn-secondary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .btn-secondary {
      background: rgba(245, 158, 11, 0.08);
      border: 1px solid rgba(245, 158, 11, 0.3);
      color: #fbbf24;
    }

    .btn-secondary:hover:not(:disabled) {
      background: rgba(245, 158, 11, 0.16);
      border-color: rgba(245, 158, 11, 0.5);
    }

    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-2) 0;
      cursor: pointer;
      position: relative;
    }

    .switch-meta {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .switch-title {
      font-size: 12px;
      font-weight: 500;
      color: var(--text-primary);
    }

    .switch-sub {
      font-size: 11px;
      color: var(--text-tertiary);
    }

    .switch-row input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      width: 34px;
      height: 18px;
      background: var(--surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      position: relative;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .slider::before {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      left: 2px;
      top: 2px;
      background: var(--text-tertiary);
      border-radius: 50%;
      transition: all 0.2s ease;
    }

    .switch-row input:checked + .slider {
      background: rgba(45, 212, 191, 0.2);
      border-color: var(--accent-frontier);
    }

    .switch-row input:checked + .slider::before {
      transform: translateX(16px);
      background: var(--accent-frontier);
    }

    .legend-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-2);
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font-size: 11px;
      color: var(--text-secondary);
    }

    .swatch {
      width: 10px;
      height: 10px;
      border-radius: 2px;
      flex-shrink: 0;
    }

    .swatch.normal { background: #132230; border: 1px solid #1e3347; }
    .swatch.crowded { background: var(--accent-crowded); }
    .swatch.shelf { background: var(--accent-shelf); }
    .swatch.restricted { background: var(--accent-danger); }
    .swatch.frontier { background: var(--accent-frontier); }
    .swatch.route { background: var(--accent-route); }
  `],
})
export class ControlPanelComponent {
  readonly store = inject(SimulationStoreService);
}
