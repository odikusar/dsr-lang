import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { MemoFile } from '@models/memo-file.model';
import { Observable, from, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemoFileApiService {
  readonly collectionName: string = 'memoFiles';

  constructor(private afs: AngularFirestore) {}

  loadAll(userId: string): Observable<MemoFile[]> {
    return this.afs
      .collection<MemoFile>(this.collectionName, (ref) => ref.where('userId', '==', userId))
      .snapshotChanges()
      .pipe(
        take(1),
        map((items) => items.map((docAction) => this.documentToItem<MemoFile>(docAction)))
      );
  }

  create(memoFile: Partial<MemoFile>): Observable<MemoFile> {
    return from(this.afs.collection<Partial<MemoFile>>(this.collectionName).add(memoFile)).pipe(
      map((res) => ({ ...memoFile, id: res.id } as MemoFile))
    );
  }

  update(memoFile: Partial<MemoFile>): Observable<MemoFile> {
    return from(
      this.afs.collection<Partial<MemoFile>>(this.collectionName).doc(memoFile.id).set(memoFile)
    ).pipe(map(() => ({ ...memoFile } as MemoFile)));
  }

  delete(memoFileId: string): Observable<void> {
    return from(this.afs.doc(`${this.collectionName}/${memoFileId}`).delete());
  }

  documentToItem<T>(docAction: DocumentChangeAction<T>): T {
    const data = docAction.payload.doc.data();
    const id = docAction.payload.doc.id;

    return {
      id,
      ...data,
    };
  }
}
