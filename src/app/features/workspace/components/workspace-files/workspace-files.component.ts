import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FileService } from '@app/services/file.service';
import { MemoFile } from '@models/memo-file.model';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { UserFacade } from '@state/user';

@Component({
  selector: 'dsr-workspace-files',
  templateUrl: './workspace-files.component.html',
  styleUrls: ['./workspace-files.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceFilesComponent implements OnInit {
  @Input() memoFiles: MemoFile[];
  @Input() activeMemoFileId: string;

  private loader = this.loadingBar.useRef();

  constructor(
    private userFacade: UserFacade,
    private fileService: FileService,
    private loadingBar: LoadingBarService
  ) {}

  ngOnInit(): void {}

  uploadMemoFile(event: Event, memoFile: MemoFile = null): void {
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
    this.fileService.delete(memoFile);
  }

  selectMemoFile(memoFile: MemoFile): void {
    this.userFacade.setActiveMemoFileId(memoFile.id);
    console.error(this.memoFiles); /////
    // this.memoRowFacade.loadAll(memoFile);
    // this.memoFileFacade.select(memoFile.id);

    // this.http.get(memoFile.url, { responseType: 'text' }).subscribe((data) => {
    //   console.log(data);
    //   const test = this.ngxCsvParser.csvStringToArray(data, ',');
    //   test.pop();
    //   console.error(test[test.length - 1]);
    // });
  }
}
