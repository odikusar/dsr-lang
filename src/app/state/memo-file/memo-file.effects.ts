import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FireApiService } from '@app/services/fire-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import * as fromActions from './memo-file.actions';

@Injectable()
export class MemoFileEffects {
  constructor(
    private actions$: Actions,
    private fireApi: FireApiService,
    private afAuth: AngularFireAuth
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadAll),
      switchMap(() => this.afAuth.authState.pipe(take(1))),
      switchMap((user) =>
        this.fireApi.getMemoFiles(user.uid).pipe(
          take(1),
          map((memoFiles) => fromActions.loadAllSuccess({ payload: memoFiles }))
        )
      )
    )
  );
}
