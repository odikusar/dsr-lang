import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '@models/user.model';
import { Observable, from, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  readonly collectionName: string = 'users';

  constructor(private afs: AngularFirestore) {}

  load(userId: string): Observable<User> {
    return this.afs
      .doc<User>(`${this.collectionName}/${userId}`)
      .valueChanges()
      .pipe(
        take(1),
        map((user) => ({ ...user, id: userId }))
      );
  }

  update(userId: string, changes: Partial<User>): Observable<Partial<User>> {
    return from(
      this.afs.collection<Partial<User>>(this.collectionName).doc(userId).set(changes)
    ).pipe(map(() => ({ ...changes } as Partial<User>)));
  }
}
