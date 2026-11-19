import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulationStoreService } from '../../core/services/simulation-store.service';
import { SearchResult } from '../../core/models/warehouse.model';

@Component({
  selector: 'app-comparison-dock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="comparison-dock" aria-labelledby="comparison-heading">
      <button
        type="button"
        class="dock-header"
        (click)="toggleCollapsed()"
        [attr.aria-expanded]="!isCollapsed()"
        aria-controls="comparison-results"
      >
        <div class="dock-title-group">
          <span class="dock-eyebrow">Task 5 Evaluation Matrix</span>
          <h2 id="comparison-heading">Performance Comparison & Replanning Metrics</h2>
        </div>

        <div class="dock-actions">
          <span class="dock-sub">Comparing step count vs operating cost & dynamic replans.</span>
          <span class="collapse-btn" aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              [style.transform]="isCollapsed() ? 'rotate(180deg)' : 'rotate(0)'"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
      </button>

      @if (!isCollapsed()) {
        <div class="table-wrap" id="comparison-results">
          <table class="benchmark-table">
            <thead>
              <tr>
                <th scope="col">Algorithm</th>
                <th scope="col">Goal Reached</th>
                <th scope="col">Path Length</th>
                <th scope="col">Total Cost</th>
                <th scope="col">Nodes Expanded</th>
                <th scope="col">Replans</th>
                <th scope="col">Execution Time</th>
                <th scope="col">Behavior & Optimality</th>
              </tr>
            </thead>
            <tbody>
              @if (store.comparisonData().length === 0) {
                <tr>
                  <td colspan="8" class="loading-cell">
                    <span class="spinner"></span> Loading benchmark comparison data...
                  </td>
                </tr>
              } @else {
                @for (row of store.comparisonData(); track row.algorithm) {
                  <tr [class.highlight]="row.algorithm === 'astar'" [class.replan-row]="row.algorithm === 'astar_replan'">
                    <td class="cell-algo">
                      <strong>{{ formatAlgorithmName(row.algorithm) }}</strong>
                    </td>
                    <td>
                      <span class="status-badge" [class.success]="row.reached">
                        {{ row.reached ? 'Yes' : 'No' }}
                      </span>
                    </td>
                    <td class="cell-mono">{{ row.moves }} moves</td>
                    <td class="cell-mono cost-val">
                      <strong>{{ row.totalCost }}</strong>
                      @if (row.algorithm === 'astar') {
                        <span class="cost-tag best">Lowest cost</span>
                      } @else if (row.algorithm === 'astar_replan') {
                        <span class="cost-tag detour">Dynamic detour</span>
                      } @else if (row.algorithm === 'dfs') {
                        <span class="cost-tag penalty">Non-optimal</span>
                      } @else {
                        <span class="cost-tag penalty">Crowded penalty</span>
                      }
                    </td>
                    <td class="cell-mono">{{ row.nodesExpanded }} nodes</td>
                    <td class="cell-mono">
                      @if (row.replans && row.replans > 0) {
                        <span class="replan-badge">1 Replan</span>
                      } @else {
                        <span class="replan-zero">0</span>
                      }
                    </td>
                    <td class="cell-mono">{{ row.elapsedMs | number : '1.3-3' }} ms</td>
                    <td>
                      <span class="char-tag" [attr.data-algo]="row.algorithm">
                        {{ getCharacteristic(row.algorithm) }}
                      </span>
                    </td>
                  </tr>
                }
              }
            </tbody>
          </table>
        </div>
      }
    </section>
  `,
  styles: [`
    .comparison-dock {
      background: var(--surface-card);
      border-top: 1px solid var(--border-subtle);
      transition: all 0.25s ease;
    }

    .dock-header {
      width: 100%;
      padding: var(--space-4) var(--space-5);
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      user-select: none;
      border: 0;
      color: inherit;
      text-align: left;
      font: inherit;
    }

    .dock-header:hover {
      background: var(--surface-elevated);
    }

    .dock-title-group h2 {
      font-size: 15px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .dock-eyebrow {
      font-size: 11px;
      font-family: var(--font-mono);
      color: var(--accent-frontier);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: block;
      margin-bottom: 2px;
    }

    .dock-actions {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .dock-sub {
      font-size: 12px;
      color: var(--text-tertiary);
    }

    .collapse-btn {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm);
      background: var(--surface-subtle);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      cursor: pointer;
    }

    .table-wrap {
      padding: 0 var(--space-5) var(--space-5);
      overflow-x: auto;
    }

    .benchmark-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      text-align: left;
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .benchmark-table th {
      padding: 10px 14px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--text-tertiary);
      border-bottom: 1px solid var(--border-subtle);
      background: rgba(0, 0, 0, 0.2);
    }

    .benchmark-table td {
      padding: 11px 14px;
      border-bottom: 1px solid var(--border-subtle);
      color: var(--text-secondary);
    }

    .benchmark-table tr:last-child td {
      border-bottom: none;
    }

    .benchmark-table tr.highlight {
      background: rgba(45, 212, 191, 0.04);
    }

    .benchmark-table tr.replan-row {
      background: rgba(245, 158, 11, 0.04);
    }

    .cell-algo {
      color: var(--text-primary);
    }

    .cell-mono {
      font-family: var(--font-mono);
      font-size: 12px;
    }

    .cost-val {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .cost-tag {
      font-size: 10px;
      padding: 1px 5px;
      border-radius: var(--radius-sm);
    }

    .cost-tag.best {
      background: rgba(45, 212, 191, 0.15);
      color: var(--accent-frontier);
      font-weight: 600;
    }

    .cost-tag.detour {
      background: rgba(245, 158, 11, 0.15);
      color: var(--accent-candidate);
      font-weight: 600;
    }

    .cost-tag.penalty {
      background: rgba(244, 63, 94, 0.12);
      color: var(--accent-danger);
    }

    .replan-badge {
      display: inline-flex;
      font-size: 10px;
      font-family: var(--font-mono);
      padding: 2px 6px;
      border-radius: var(--radius-sm);
      background: rgba(245, 158, 11, 0.15);
      color: var(--accent-candidate);
      font-weight: 600;
    }

    .replan-zero {
      color: var(--text-tertiary);
    }

    .status-badge {
      display: inline-flex;
      font-size: 11px;
      font-family: var(--font-mono);
      padding: 2px 6px;
      border-radius: var(--radius-sm);
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-tertiary);
    }

    .status-badge.success {
      background: rgba(16, 185, 129, 0.12);
      color: var(--accent-success);
    }

    .char-tag {
      font-size: 11px;
      color: var(--text-secondary);
    }

    .char-tag[data-algo='astar'] {
      color: var(--accent-frontier);
      font-weight: 500;
    }

    .char-tag[data-algo='astar_replan'] {
      color: var(--accent-candidate);
      font-weight: 500;
    }

    .loading-cell {
      text-align: center;
      padding: var(--space-6);
      color: var(--text-tertiary);
    }

    .spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid var(--border-subtle);
      border-top-color: var(--accent-frontier);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      vertical-align: middle;
      margin-right: 6px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 900px) {
      .dock-sub {
        display: none;
      }
    }
  `],
})
export class ComparisonDockComponent {
  readonly store = inject(SimulationStoreService);
  readonly isCollapsed = signal<boolean>(false);

  toggleCollapsed(): void {
    this.isCollapsed.update((val) => !val);
  }

  formatAlgorithmName(algo: string): string {
    switch (algo) {
      case 'astar':
        return 'A* (Baseline)';
      case 'astar_replan':
      case 'trolley_replan':
        return 'A* (Trolley Replan)';
      case 'bfs':
        return 'BFS';
      case 'dfs':
        return 'DFS';
      case 'greedy':
        return 'Greedy Best';
      default:
        return algo.toUpperCase();
    }
  }

  getCharacteristic(algo: string): string {
    switch (algo) {
      case 'astar':
        return 'Cost-Optimal (Balances cost-so-far + Manhattan distance, avoids crowded corridor)';
      case 'astar_replan':
      case 'trolley_replan':
        return 'Dynamic Obstacle Avoidance (detects the hidden trolley, updates the map, and replans)';
      case 'bfs':
        return 'Hop-Optimal (takes the short centre aisle without considering its crowded-cell cost)';
      case 'greedy':
        return 'Heuristic Trap (heads directly toward the goal through the crowded centre aisle)';
      case 'dfs':
        return 'LIFO Deep Dive (explores a long perimeter branch and is not path-optimal)';
      default:
        return 'Standard Search';
    }
  }
}
