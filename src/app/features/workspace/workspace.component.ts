import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FileService } from '@app/services/file.service';
import { MemoFile } from '@models/memo-file.model';
import { MemoFileFacade } from '@state/memo-file';
import { MemoRowFacade } from '@state/memo-row';
import { NgxCsvParser } from 'ngx-csv-parser';

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
    private memoRowFacade: MemoRowFacade
  ) {}

  memoFiles$ = this.memoFileFacade.loadAll();
  memoRows$ = this.memoRowFacade.memoRows$;
  selectedMemoFileId$ = this.memoFileFacade.selectedId$;

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
    // this.memoRowFacade.loadAll(memoFile);
    this.memoFileFacade.select(memoFile.id);

    // this.http.get(memoFile.url, { responseType: 'text' }).subscribe((data) => {
    //   console.log(data);
    //   const test = this.ngxCsvParser.csvStringToArray(data, ',');
    //   test.pop();
    //   console.error(test[test.length - 1]);
    // });
  }
}
