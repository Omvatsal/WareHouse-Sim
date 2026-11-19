import {
  Component,
  ElementRef,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulationStoreService } from '../../core/services/simulation-store.service';
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'app-telemetry-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="telemetry-panel" aria-label="Real-time search telemetry and decision feed">
      <!-- Section: Telemetry Header -->
      <header class="telemetry-header">
        <div>
          <span class="telemetry-eyebrow">Real-Time Telemetry</span>
          <h2>{{ store.selectedAlgorithm() === 'astar' ? 'A*' : store.selectedAlgorithm().toUpperCase() }} Search Analysis</h2>
        </div>
        <span class="state-pill" [attr.data-state]="store.systemStatus()">
          {{ store.systemStatus() | uppercase }}
        </span>
      </header>

      <!-- Section: Hero Metrics Grid -->
      <section class="metrics-grid">
        <article class="metric-card hero cost">
          <span class="metric-label">Total Path Cost</span>
          <div class="metric-value-row">
            <strong #costVal class="metric-val hero-num">{{ store.totalCost() }}</strong>
            <span class="metric-unit">cost</span>
          </div>
          <span class="metric-sub">Open = 1 · Crowded = 4</span>
        </article>

        <article class="metric-card hero moves">
          <span class="metric-label">Path Length</span>
          <div class="metric-value-row">
            <strong #movesVal class="metric-val hero-num">{{ store.moves() }}</strong>
            <span class="metric-unit">moves</span>
          </div>
          <span class="metric-sub">Orthogonal steps</span>
        </article>

        <article class="metric-card sub">
          <span class="metric-label">Nodes Expanded</span>
          <div class="metric-value-row">
            <strong class="metric-val">{{ store.nodesExpanded() }}</strong>
            <span class="metric-unit">nodes</span>
          </div>
        </article>

        <article class="metric-card sub">
          <span class="metric-label">Execution Time</span>
          <div class="metric-value-row">
            <strong class="metric-val">{{ store.elapsedMs() | number : '1.2-3' }}</strong>
            <span class="metric-unit">ms</span>
          </div>
        </article>
      </section>

      <!-- Section: Decision Log Feed -->
      <section class="feed-section">
        <div class="feed-header">
          <h3>Decision Feed</h3>
          <span class="feed-count">{{ store.feedEvents().length }} events</span>
        </div>

        <div #feedContainer class="feed-scroll" tabindex="0" aria-label="Historical expansion log">
          @if (store.feedEvents().length === 0) {
            <div class="empty-feed">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p>Expansion events will stream here during search execution.</p>
            </div>
          } @else {
            @for (item of store.feedEvents(); track item.index) {
              <div class="feed-item">
                <span class="feed-badge">{{ item.index }}</span>
                <div class="feed-content">
                  <div class="feed-top">
                    <strong>Expand [{{ item.current.join(', ') }}]</strong>
                  </div>
                  <p class="feed-detail">{{ item.detail }}</p>
                </div>
              </div>
            }
          }
        </div>
      </section>

      <!-- Section: Heuristic Admissibility Note -->
      <section class="heuristic-card">
        <div class="card-icon">
          <span>h(n)</span>
        </div>
        <div class="card-text">
          <strong>Manhattan Distance Heuristic</strong>
          <p>
            Admissible and monotone lower bound: with strictly 4-directional moves and min step cost of 1,
            |Δrow| + |Δcol| never exceeds true remaining travel cost.
          </p>
        </div>
      </section>
    </aside>
  `,
  styles: [`
    .telemetry-panel {
      padding: var(--space-5);
      background: var(--surface-card);
      border-left: 1px solid var(--border-subtle);
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
    }

    .telemetry-eyebrow {
      font-size: 11px;
      font-family: var(--font-mono);
      color: var(--accent-frontier);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: block;
      margin-bottom: 2px;
    }

    .telemetry-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--space-2);
    }

    .telemetry-header h2 {
      font-size: 15px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .state-pill {
      font-size: 10px;
      font-family: var(--font-mono);
      padding: 3px 7px;
      border-radius: var(--radius-sm);
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-tertiary);
      letter-spacing: 0.05em;
    }

    [data-state='running'] {
      color: var(--accent-frontier);
      border-color: rgba(45, 212, 191, 0.4);
      background: rgba(45, 212, 191, 0.08);
    }

    [data-state='complete'] {
      color: var(--accent-success);
      border-color: rgba(16, 185, 129, 0.4);
      background: rgba(16, 185, 129, 0.08);
    }

    [data-state='error'] {
      color: var(--accent-danger);
      border-color: rgba(244, 63, 94, 0.4);
      background: rgba(244, 63, 94, 0.08);
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-2);
    }

    .metric-card {
      padding: var(--space-3);
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .metric-card.hero {
      grid-column: span 1;
      background: linear-gradient(180deg, var(--surface-elevated) 0%, rgba(18, 24, 32, 0.6) 100%);
    }

    .metric-card.hero.cost {
      border-top: 2px solid var(--accent-route);
    }

    .metric-card.hero.moves {
      border-top: 2px solid var(--accent-frontier);
    }

    .metric-label {
      font-size: 11px;
      font-weight: 500;
      color: var(--text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .metric-value-row {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }

    .metric-val {
      font-family: var(--font-mono);
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .hero-num {
      font-size: 24px;
      font-weight: 700;
    }

    .metric-unit {
      font-size: 11px;
      color: var(--text-tertiary);
      font-family: var(--font-mono);
    }

    .metric-sub {
      font-size: 10px;
      color: var(--text-tertiary);
      margin-top: 2px;
    }

    .feed-section {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      flex: 1;
      min-height: 220px;
    }

    .feed-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .feed-header h3 {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-secondary);
    }

    .feed-count {
      font-size: 11px;
      font-family: var(--font-mono);
      color: var(--text-tertiary);
    }

    .feed-scroll {
      height: 240px;
      overflow-y: auto;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      background: var(--surface-elevated);
      padding: var(--space-2);
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .empty-feed {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      color: var(--text-tertiary);
      text-align: center;
      padding: var(--space-4);
      font-size: 12px;
    }

    .feed-item {
      display: flex;
      align-items: flex-start;
      gap: var(--space-2);
      padding: 6px 8px;
      background: var(--surface-card);
      border: 1px solid rgba(255, 255, 255, 0.03);
      border-radius: var(--radius-sm);
      animation: fadeIn 0.18s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .feed-badge {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: rgba(45, 212, 191, 0.12);
      color: var(--accent-frontier);
      font-size: 10px;
      font-family: var(--font-mono);
      flex-shrink: 0;
    }

    .feed-content {
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }

    .feed-top strong {
      font-size: 12px;
      font-family: var(--font-mono);
      color: var(--text-primary);
    }

    .feed-detail {
      font-size: 11px;
      color: var(--text-secondary);
      line-height: 1.35;
    }

    .heuristic-card {
      display: flex;
      gap: var(--space-3);
      padding: var(--space-3);
      background: rgba(45, 212, 191, 0.04);
      border: 1px solid rgba(45, 212, 191, 0.15);
      border-radius: var(--radius-md);
    }

    .card-icon {
      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: 700;
      color: var(--accent-frontier);
      flex-shrink: 0;
    }

    .card-text strong {
      display: block;
      font-size: 12px;
      color: var(--text-primary);
      margin-bottom: 2px;
    }

    .card-text p {
      font-size: 11px;
      color: var(--text-secondary);
      line-height: 1.45;
    }
  `],
})
export class TelemetryPanelComponent {
  @ViewChild('feedContainer') feedContainerRef?: ElementRef<HTMLElement>;
  @ViewChild('costVal') costValRef?: ElementRef<HTMLElement>;
  @ViewChild('movesVal') movesValRef?: ElementRef<HTMLElement>;

  readonly store = inject(SimulationStoreService);
  readonly animation = inject(AnimationService);

  constructor() {
    effect(() => {
      const events = this.store.feedEvents();
      if (events.length > 0 && this.feedContainerRef) {
        // Auto-scroll to bottom smoothly without hijacking manual user inspects
        const el = this.feedContainerRef.nativeElement;
        el.scrollTop = el.scrollHeight;
      }
    });

    effect(() => {
      const cost = this.store.totalCost();
      if (this.costValRef) {
        this.animation.animateCounter(this.costValRef.nativeElement, 0, cost, 300);
      }
    });

    effect(() => {
      const moves = this.store.moves();
      if (this.movesValRef) {
        this.animation.animateCounter(this.movesValRef.nativeElement, 0, moves, 300);
      }
    });
  }
}
