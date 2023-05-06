import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FileService } from '@app/services/file.service';
import { MemoFile } from '@models/memo-file.model';
import { MemoFileFacade } from '@state/memo-file';

@Component({
  selector: 'dsr-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceComponent implements OnInit {
  constructor(
    private memoFileFacade: MemoFileFacade,
    private fileService: FileService,
    private http: HttpClient
  ) {}

  memoFiles$ = this.memoFileFacade.loadAll();

  ngOnInit(): void {}

  uploadMemoFile(event: Event, memoFile: MemoFile = null): void {
    const target = event.target as HTMLInputElement;

    if (!!target.files) {
      const file = target.files.item(0);

      if (!!file) {
        this.fileService.upload(file, memoFile);
      }
    }
  }

  deleteMemoFile(memoFile: MemoFile): void {
    this.fileService.delete(memoFile);
  }

  readMemoFile(memoFile: MemoFile): void {
    this.http.get(memoFile.url, { responseType: 'text' }).subscribe((data) => {
      console.log(data);
    });
  }
}
