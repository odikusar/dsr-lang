import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsr-workspace-controls',
  templateUrl: './workspace-controls.component.html',
  styleUrls: ['./workspace-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceControlsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
