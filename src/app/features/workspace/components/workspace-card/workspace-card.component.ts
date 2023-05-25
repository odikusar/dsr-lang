import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsr-workspace-card',
  templateUrl: './workspace-card.component.html',
  styleUrls: ['./workspace-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
