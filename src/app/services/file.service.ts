import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MemoFile } from '@models/memo-file.model';
import { AuthFacade } from '@state/auth';
import { MemoFileFacade } from '@state/memo-file';
import { Observable, finalize, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private readonly basePath = '/csv';
  private readonly RANDOM_FILENAME_PREFIX_LENGTH = 10;

  constructor(
    private storage: AngularFireStorage,
    private authFacade: AuthFacade,
    private memoFileFacade: MemoFileFacade
  ) {}

  upload(file: File, memoFile: MemoFile = null): void {
    const fileName = this.getRandomFileName(file.name);
    const filePath = this.getFilePath(fileName);
    const uploadTask = this.storage.upload(filePath, file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() =>
          this.storage
            .ref(filePath)
            .getDownloadURL()
            .pipe(take(1))
            .subscribe((downloadURL) => {
              if (!!memoFile) {
                this.memoFileFacade.update({
                  ...memoFile,
                  url: downloadURL,
                  name: fileName,
                  initialName: file.name,
                });

                this.erase(memoFile.name).pipe(take(1)).subscribe();
              } else {
                this.memoFileFacade.create({
                  url: downloadURL,
                  name: fileName,
                  initialName: file.name,
                  userId: this.authFacade.userId,
                });
              }
            })
        )
      )
      .subscribe();
  }

  delete(memoFile: MemoFile): void {
    this.memoFileFacade.delete(memoFile.id);
    this.erase(memoFile.name).pipe(take(1)).subscribe();
  }

  erase(fileName: string): Observable<any> {
    return this.storage.ref(this.basePath).child(fileName).delete();
  }

  private getFilePath(fileName: string): string {
    return `${this.basePath}/${fileName}`;
  }

  private getRandomFileName(fileName: string): string {
    const startSlice = 2;
    const randomString = Math.random()
      .toString(36)
      .slice(startSlice, this.RANDOM_FILENAME_PREFIX_LENGTH + startSlice);

    return `${randomString}_${fileName}`;
  }

  // REMOVE TO PIPE !!!!
  // private getTitleFromFileName(fileName: string) {
  //   return fileName.replace(/\.[^/.]+$/, '');
  // }
}
