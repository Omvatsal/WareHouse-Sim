import {
  Component,
  ElementRef,
  ViewChild,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guide-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <dialog #dialogRef class="guide-dialog" (click)="onBackdropClick($event)">
      <div class="dialog-content">
        <header class="dialog-header">
          <div>
            <span class="dialog-eyebrow">Operator Manual</span>
            <h2>How to Navigate the Simulation</h2>
          </div>
          <button type="button" class="close-btn" (click)="close()" aria-label="Close guide">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <div class="guide-grid">
          <article class="guide-card">
            <div class="card-step">01</div>
            <h3>Select a Strategy</h3>
            <p>
              Compare four pathfinding paradigms on the exact same warehouse topology.
              <strong>BFS</strong> guarantees the minimum move count; <strong>DFS</strong> probes a single branch deeply;
              <strong>Greedy</strong> rushes toward the heuristic goal; and <strong>A*</strong> mathematically balances
              accumulated path cost with remaining distance to guarantee minimal total cost.
            </p>
          </article>

          <article class="guide-card">
            <div class="card-step">02</div>
            <h3>Observe the Wavefront</h3>
            <p>
              The 3D warehouse floor projects the active search state in real time:
              <strong>Teal tiles</strong> represent cells queued in the frontier;
              <strong>Amber tiles</strong> represent newly evaluated neighboring candidates;
              the <strong>pulsing white tile</strong> is being expanded; and the
              <strong>golden beam</strong> indicates the final committed route.
            </p>
          </article>

          <article class="guide-card">
            <div class="card-step">03</div>
            <h3>Test Dynamic Disruption</h3>
            <p>
              Trigger the <strong>Hidden Trolley Event</strong> to test sensor-horizon replanning. The obstacle is absent
              from the robot's initial dispatch map. The AMR travels along its planned path until proximity sensors detect the trolley
              1 cell ahead. It halts, updates its internal belief map, and replans an optimal avoidance route using A*.
            </p>
          </article>
        </div>

        <footer class="dialog-footer">
          <div class="footer-tip">
            <strong>Camera Tip:</strong> Left-click and drag to orbit in 3D; right-click to pan; scroll to zoom. Use the top-right toolbar for instant top-down and isometric resets.
          </div>
          <button type="button" class="btn-done" (click)="close()">Got it</button>
        </footer>
      </div>
    </dialog>
  `,
  styles: [`
    .guide-dialog {
      width: min(800px, calc(100vw - 32px));
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      background: var(--surface-card);
      color: var(--text-primary);
      padding: 0;
      margin: auto;
      box-shadow: var(--shadow-elevated);
    }

    .guide-dialog::backdrop {
      background: rgba(4, 8, 14, 0.75);
      backdrop-filter: blur(8px);
    }

    .dialog-content {
      padding: var(--space-6);
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
    }

    .dialog-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .dialog-eyebrow {
      font-size: 11px;
      font-family: var(--font-mono);
      color: var(--accent-frontier);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: block;
      margin-bottom: 2px;
    }

    .dialog-header h2 {
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .close-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm);
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .close-btn:hover {
      background: var(--surface-subtle);
      color: var(--text-primary);
      border-color: var(--border-hover);
    }

    .guide-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-3);
    }

    .guide-card {
      padding: var(--space-4);
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .card-step {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      color: var(--accent-frontier);
    }

    .guide-card h3 {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .guide-card p {
      font-size: 12px;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .guide-card strong {
      color: var(--text-primary);
    }

    .dialog-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: var(--space-4);
      border-top: 1px solid var(--border-subtle);
      gap: var(--space-4);
    }

    .footer-tip {
      font-size: 11px;
      color: var(--text-tertiary);
      line-height: 1.4;
    }

    .footer-tip strong {
      color: var(--text-secondary);
    }

    .btn-done {
      height: 36px;
      padding: 0 var(--space-5);
      border-radius: var(--radius-sm);
      background: var(--accent-frontier);
      color: #051b1c;
      border: none;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.15s ease;
    }

    .btn-done:hover {
      background: #5eead4;
    }

    @media (max-width: 768px) {
      .guide-grid {
        grid-template-columns: 1fr;
      }
      .dialog-footer {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `],
})
export class GuideModalComponent {
  @ViewChild('dialogRef') dialogRef?: ElementRef<HTMLDialogElement>;
  readonly closed = output<void>();

  open(): void {
    this.dialogRef?.nativeElement.showModal();
  }

  close(): void {
    this.dialogRef?.nativeElement.close();
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === this.dialogRef?.nativeElement) {
      this.close();
    }
  }
}
