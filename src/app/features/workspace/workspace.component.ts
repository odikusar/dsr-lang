import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FileUploadService } from '@app/services/file-upload.service';
import { FileUpload } from '@models/file-upload.model';
import { MemoFile } from '@models/memo-file.model';
import { MemoFileFacade } from '@state/memo-file';

@Component({
  selector: 'dsr-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  constructor(
    private memoFileFacade: MemoFileFacade,
    private uploadService: FileUploadService,
    private http: HttpClient
  ) {}

  memoFiles$ = this.memoFileFacade.loadAll();
  testFile =
    'https://firebasestorage.googleapis.com/v0/b/dsr-lang.appspot.com/o/csv%2Fwords-work.csv?alt=media&token=a0c05e76-18e7-42cf-93cb-511da0050fee';

  ngOnInit(): void {}

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.uploadFileToStorage(this.currentFileUpload).subscribe({
          complete: () => {
            this.currentFileUpload.url;
            this.currentFileUpload.name;
            console.error(this.currentFileUpload);
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    }
  }

  deleteFile(memoFile: MemoFile): void {
    console.error(memoFile);
  }

  readFile(memoFile: MemoFile): void {
    this.http.get(memoFile.url, { responseType: 'text' }).subscribe((data) => {
      console.log(data);
    });
  }
}
