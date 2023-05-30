import { Pipe, PipeTransform } from '@angular/core';
import { MemoFile } from '@models/memo-file.model';

@Pipe({
  name: 'fileName',
})
export class FileNamePipe implements PipeTransform {
  private readonly FILENAME_LENGTH = 12;

  transform(memoFile: MemoFile): string {
    return this.removeExtension(memoFile.initialName).slice(0, this.FILENAME_LENGTH);
  }

  private removeExtension(fileName: string): string {
    return fileName.substring(0, fileName.lastIndexOf('.'));
  }
}
