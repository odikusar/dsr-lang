import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FireApiService } from '@app/services/fire-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
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
          map((memoFiles) => fromActions.loadAllSuccess({ payload: memoFiles })),
          catchError((error) => of(fromActions.loadAllFail(error)))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.create),
      switchMap(({ payload }) =>
        this.fireApi.createMemoFile(payload).pipe(
          map((memoFile) => fromActions.createSuccess({ payload: memoFile })),
          catchError((error) => of(fromActions.createFail(error)))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.update),
      switchMap(({ payload }) =>
        this.fireApi.updateMemoFile(payload.changes).pipe(
          map((memoFile) =>
            fromActions.updateSuccess({ payload: { id: memoFile.id, changes: memoFile } })
          ),
          catchError((error) => of(fromActions.updateFail(error)))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deleteOne),
      switchMap((payload) =>
        this.fireApi.deleteMemoFile(payload.id).pipe(
          map(() => fromActions.deleteOneSuccess({ id: payload.id })),
          catchError((error) => of(fromActions.deleteOneFail(error)))
        )
      )
    )
  );
}
