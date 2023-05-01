import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { MemoFile } from '@models/memo-file.model';
import { Observable, map, take } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FireApiService {
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  documentToItem<T>(docAction: DocumentChangeAction<T>): T {
    const data = docAction.payload.doc.data();
    const id = docAction.payload.doc.id;

    return {
      id,
      ...data,
    };
  }

  getUser(userId: string): Observable<User> {
    return this.afs
      .doc<User>(`users/${userId}`)
      .valueChanges()
      .pipe(
        take(1),
        map((user) => ({ ...user, id: userId }))
      );
  }

  getMemoFiles(userId: string): Observable<MemoFile[]> {
    return this.afs
      .collection<MemoFile>('memoFiles', (ref) => ref.where('userId', '==', userId))
      .snapshotChanges()
      .pipe(
        take(1),
        map((items) => items.map((docAction) => this.documentToItem<MemoFile>(docAction)))
      );
  }
}
