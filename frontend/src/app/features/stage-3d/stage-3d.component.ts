import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeSceneService } from '../../core/services/three-scene.service';
import { SimulationStoreService } from '../../core/services/simulation-store.service';

@Component({
  selector: 'app-stage-3d',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stage-container" aria-label="3D warehouse simulation stage">
      <!-- 3D Canvas Host -->
      <div #canvasHost class="webgl-canvas" role="img" aria-label="Interactive 3D simulation of warehouse robot grid"></div>

      <!-- Viewport Floating Tools (Top-Right) -->
      <div class="viewport-tools">
        <button
          type="button"
          class="tool-btn"
          (click)="store.resetCamera()"
          title="Reset Isometric Camera"
          aria-label="Reset isometric camera"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </button>

        <button
          type="button"
          class="tool-btn"
          (click)="store.topCamera()"
          title="Top-Down Plan View"
          aria-label="Top-down plan view"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
          </svg>
        </button>
      </div>

      <!-- Non-intrusive Stage HUD (Bottom Dock) -->
      <div class="stage-hud">
        <div class="hud-main">
          <span class="hud-step">{{ store.stepLabel() }}</span>
          <p class="hud-msg">{{ store.statusMessage() }}</p>
        </div>

        <div class="hud-key">
          <span class="key-item"><i class="key-dot current"></i>Expanding</span>
          <span class="key-item"><i class="key-dot candidate"></i>Candidate</span>
          <span class="key-item"><i class="key-dot route"></i>Route</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stage-container {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 520px;
      background: var(--surface-ground);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .webgl-canvas {
      width: 100%;
      height: 100%;
      flex: 1;
      display: block;
    }

    .viewport-tools {
      position: absolute;
      top: var(--space-4);
      right: var(--space-4);
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      z-index: 10;
    }

    .tool-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-secondary);
      cursor: pointer;
      box-shadow: var(--shadow-card);
      transition: all 0.15s ease;
    }

    .tool-btn:hover {
      background: var(--surface-elevated);
      color: var(--text-primary);
      border-color: var(--border-hover);
    }

    .stage-hud {
      position: absolute;
      bottom: var(--space-4);
      left: var(--space-4);
      right: var(--space-4);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-3) var(--space-4);
      background: rgba(18, 24, 32, 0.88);
      backdrop-filter: blur(12px);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-card);
      z-index: 10;
      gap: var(--space-4);
    }

    .hud-main {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .hud-step {
      font-size: 11px;
      font-family: var(--font-mono);
      color: var(--accent-frontier);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .hud-msg {
      font-size: 13px;
      font-weight: 500;
      color: var(--text-primary);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .hud-key {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      flex-shrink: 0;
    }

    .key-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: var(--text-tertiary);
    }

    .key-dot {
      width: 8px;
      height: 8px;
      border-radius: 2px;
    }

    .key-dot.current { background: #ffffff; }
    .key-dot.candidate { background: var(--accent-candidate); }
    .key-dot.route { background: var(--accent-route); }

    @media (max-width: 768px) {
      .stage-hud {
        flex-direction: column;
        align-items: flex-start;
        bottom: var(--space-2);
        left: var(--space-2);
        right: var(--space-2);
        padding: var(--space-2) var(--space-3);
      }
      .hud-key {
        display: none;
      }
    }
  `],
})
export class Stage3dComponent implements OnInit, OnDestroy {
  @ViewChild('canvasHost', { static: true }) canvasHostRef!: ElementRef<HTMLElement>;

  readonly scene = inject(ThreeSceneService);
  readonly store = inject(SimulationStoreService);

  ngOnInit(): void {
    this.scene.init(this.canvasHostRef.nativeElement);
    this.store.init();
  }

  ngOnDestroy(): void {
    this.scene.destroy();
  }
}
