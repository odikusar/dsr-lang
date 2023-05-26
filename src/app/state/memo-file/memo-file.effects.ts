import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FireApiService } from '@app/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import * as fromMemoRowActions from '../memo-row/memo-row.actions';
import * as fromUserActions from '../user/user.actions';
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
          switchMap((memoFiles) =>
            of(fromActions.loadAllSuccess({ payload: memoFiles }), fromMemoRowActions.loadAll())
          ),
          catchError((error) => of(fromActions.loadAllFail({ error })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.create),
      switchMap(({ payload }) =>
        this.fireApi.createMemoFile(payload).pipe(
          switchMap((memoFile) =>
            of(
              fromActions.createSuccess({ payload: memoFile }),
              fromUserActions.setActiveMemoFileId({ id: memoFile.id })
            )
          ),
          catchError((error) => of(fromActions.createFail({ error })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.update),
      switchMap(({ payload }) =>
        this.fireApi.updateMemoFile(payload.changes).pipe(
          switchMap((memoFile) =>
            of(
              fromActions.updateSuccess({ payload: { id: memoFile.id, changes: memoFile } }),
              fromUserActions.setActiveMemoFileId({ id: memoFile.id })
            )
          ),
          catchError((error) => of(fromActions.updateFail({ error })))
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
          catchError((error) => of(fromActions.deleteOneFail({ error })))
        )
      )
    )
  );
}
