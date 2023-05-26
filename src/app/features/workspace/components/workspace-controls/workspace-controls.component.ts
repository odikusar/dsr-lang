import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MemoRow } from '@models/memo-row.model';
import { MemoRowFacade } from '@state/memo-row';

@Component({
  selector: 'dsr-workspace-controls',
  templateUrl: './workspace-controls.component.html',
  styleUrls: ['./workspace-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceControlsComponent implements OnInit {
  @Input() memoRow: MemoRow;
  @Input() isPreviousMemoRowReady: boolean;

  constructor(private memoRowFacade: MemoRowFacade) {}

  ngOnInit(): void {}

  showNext(): void {
    this.memoRowFacade.setShown(this.memoRow.id);
  }

  showPrevious(): void {
    this.memoRowFacade.showPrevious();
  }
}
