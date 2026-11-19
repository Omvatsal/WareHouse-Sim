import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulationStoreService } from '../../core/services/simulation-store.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="topbar">
      <div class="brand">
        <div class="brand-glyph" aria-hidden="true">
          <span class="box-face top"></span>
          <span class="box-face left"></span>
          <span class="box-face right"></span>
        </div>
        <div class="brand-text">
          <h1>Warehouse Route Lab</h1>
          <span class="badge">AI-04 · Autonomous Navigation</span>
        </div>
      </div>

      <div class="center-status">
        <div class="status-indicator" [attr.data-status]="store.systemStatus()">
          <span class="pulse-dot"></span>
          <span class="status-text">{{ store.statusMessage() }}</span>
        </div>
      </div>

      <div class="controls-right">
        <!-- Speed Control -->
        <div class="speed-selector" role="group" aria-label="Playback speed">
          <span class="speed-label">Speed</span>
          <div class="speed-pills">
            <button
              type="button"
              [class.active]="store.playbackSpeed() === 1"
              (click)="store.setSpeed(1)"
              aria-label="0.5x speed"
            >
              0.5×
            </button>
            <button
              type="button"
              [class.active]="store.playbackSpeed() === 2"
              (click)="store.setSpeed(2)"
              aria-label="1x speed"
            >
              1.0×
            </button>
            <button
              type="button"
              [class.active]="store.playbackSpeed() === 3"
              (click)="store.setSpeed(3)"
              aria-label="2x speed"
            >
              2.0×
            </button>
            <button
              type="button"
              [class.active]="store.playbackSpeed() === 4"
              (click)="store.setSpeed(4)"
              aria-label="4x speed"
            >
              4.0×
            </button>
          </div>
        </div>

        <!-- Help Modal Button -->
        <button
          type="button"
          class="guide-btn"
          (click)="openGuide.emit()"
          aria-label="Open operator guide"
          title="Open operator guide"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>Guide</span>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .topbar {
      height: 64px;
      padding: 0 var(--space-5);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--surface-card);
      border-bottom: 1px solid var(--border-subtle);
      position: sticky;
      top: 0;
      z-index: 40;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .brand-glyph {
      width: 28px;
      height: 28px;
      position: relative;
      perspective: 120px;
    }

    .box-face {
      position: absolute;
      border: 1px solid rgba(45, 212, 191, 0.4);
    }

    .box-face.top {
      width: 18px;
      height: 18px;
      background: rgba(45, 212, 191, 0.25);
      transform: rotateX(60deg) rotateZ(45deg);
      top: 1px;
      left: 5px;
    }

    .box-face.left {
      width: 13px;
      height: 14px;
      background: rgba(45, 212, 191, 0.4);
      top: 10px;
      left: 2px;
      transform: skewY(28deg);
    }

    .box-face.right {
      width: 13px;
      height: 14px;
      background: rgba(45, 212, 191, 0.15);
      top: 10px;
      right: 2px;
      transform: skewY(-28deg);
    }

    .brand-text h1 {
      font-size: 15px;
      font-weight: 600;
      letter-spacing: -0.01em;
      color: var(--text-primary);
    }

    .badge {
      font-size: 11px;
      font-family: var(--font-mono);
      color: var(--text-tertiary);
    }

    .center-status {
      display: flex;
      align-items: center;
      max-width: 480px;
      overflow: hidden;
    }

    .status-indicator {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      padding: 4px var(--space-3);
      border-radius: var(--radius-full);
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      font-size: 12px;
      color: var(--text-secondary);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .pulse-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-success);
      box-shadow: 0 0 8px var(--accent-success);
      flex-shrink: 0;
    }

    [data-status='running'] .pulse-dot {
      background: var(--accent-frontier);
      box-shadow: 0 0 8px var(--accent-frontier);
      animation: pulse 1s infinite alternate;
    }

    [data-status='error'] .pulse-dot {
      background: var(--accent-danger);
      box-shadow: 0 0 8px var(--accent-danger);
    }

    @keyframes pulse {
      from { opacity: 0.4; }
      to { opacity: 1; }
    }

    .controls-right {
      display: flex;
      align-items: center;
      gap: var(--space-4);
    }

    .speed-selector {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .speed-label {
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--text-tertiary);
    }

    .speed-pills {
      display: flex;
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 2px;
      gap: 2px;
    }

    .speed-pills button {
      padding: 3px 8px;
      font-size: 11px;
      font-family: var(--font-mono);
      background: transparent;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      color: var(--text-secondary);
      transition: all 0.15s ease;
    }

    .speed-pills button:hover {
      color: var(--text-primary);
    }

    .speed-pills button.active {
      background: var(--surface-subtle);
      color: var(--accent-frontier);
      font-weight: 600;
    }

    .guide-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 32px;
      padding: 0 var(--space-3);
      border-radius: var(--radius-sm);
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      transition: all 0.15s ease;
    }

    .guide-btn:hover {
      background: var(--surface-subtle);
      color: var(--text-primary);
      border-color: var(--border-hover);
    }

    @media (max-width: 900px) {
      .center-status {
        display: none;
      }
    }
  `],
})
export class HeaderComponent {
  readonly store = inject(SimulationStoreService);
  readonly openGuide = output<void>();
}
