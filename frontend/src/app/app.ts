import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from './features/header/header.component';
import { ControlPanelComponent } from './features/control-panel/control-panel.component';
import { Stage3dComponent } from './features/stage-3d/stage-3d.component';
import { TelemetryPanelComponent } from './features/telemetry/telemetry-panel.component';
import { ComparisonDockComponent } from './features/comparison/comparison-dock.component';
import { GuideModalComponent } from './features/guide-modal/guide-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    ControlPanelComponent,
    Stage3dComponent,
    TelemetryPanelComponent,
    ComparisonDockComponent,
    GuideModalComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  @ViewChild('guideModal') guideModal?: GuideModalComponent;

  onOpenGuide(): void {
    this.guideModal?.open();
  }
}
