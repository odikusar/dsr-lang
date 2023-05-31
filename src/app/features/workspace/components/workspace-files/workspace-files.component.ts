import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FileService } from '@app/services';
import { MemoFile } from '@models/memo-file.model';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { UserFacade } from '@state/user';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'dsr-workspace-files',
  templateUrl: './workspace-files.component.html',
  styleUrls: ['./workspace-files.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceFilesComponent {
  @Input() memoFiles: MemoFile[];
  @Input() activeMemoFileId: string;
  @Input() isDemoUser: boolean;

  private loader = this.loadingBar.useRef();

  constructor(
    private userFacade: UserFacade,
    private fileService: FileService,
    private loadingBar: LoadingBarService,
    private toastr: ToastrService
  ) {}

  uploadMemoFile(event: Event, memoFile: MemoFile = null): void {
    if (this.isDemoUser) return this.showDisallowMessage();

    const target = event.target as HTMLInputElement;

    if (!!target.files) {
      const file = target.files.item(0);

      if (!!file) {
        this.loader.start();

        this.fileService.upload(file, memoFile).subscribe(() => this.loader.complete());
      }
    }
  }

  deleteMemoFile(memoFile: MemoFile): void {
    if (this.isDemoUser) return this.showDisallowMessage();

    if (window.confirm('Do you really want to delete this file?')) {
      this.fileService.delete(memoFile);
    }
  }

  chooseMemoFile(memoFile: MemoFile): void {
    this.userFacade.setActiveMemoFileId(memoFile.id);
  }

  showDisallowMessage(): void {
    this.toastr.warning('This action is not allowed for demo user');
  }

  fileTrackBy(index: number, item: MemoFile) {
    return item.id;
  }
}
