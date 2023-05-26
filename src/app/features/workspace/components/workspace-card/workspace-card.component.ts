import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MemoRow } from '@models/index';

@Component({
  selector: 'dsr-workspace-card',
  templateUrl: './workspace-card.component.html',
  styleUrls: ['./workspace-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceCardComponent implements OnInit {
  @Input() memoRow: MemoRow;

  constructor() {}

  ngOnInit(): void {}
}
