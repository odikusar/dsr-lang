import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MemoFile } from '@models/memo-file.model';

@Component({
  selector: 'dsr-workspace-file',
  templateUrl: './workspace-file.component.html',
  styleUrls: ['./workspace-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceFileComponent {
  @Input() memoFile: MemoFile;
  @Input() isActive: boolean = false;

  @Output() uploadMemoFile = new EventEmitter<Event>();
  @Output() chooseMemoFile = new EventEmitter<MemoFile>();
  @Output() deleteMemoFile = new EventEmitter<MemoFile>();
}
