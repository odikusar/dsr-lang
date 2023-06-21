import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MemoFileApiService } from '@app/services/api/memo-file-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import * as fromMemoRowActions from '../memo-row/memo-row.actions';
import * as fromUserActions from '../user/user.actions';
import * as fromActions from './memo-file.actions';

@Injectable()
export class MemoFileEffects {
  private loader = this.loadingBar.useRef();

  constructor(
    private actions$: Actions,
    private memoFileApi: MemoFileApiService,
    private afAuth: AngularFireAuth,
    private loadingBar: LoadingBarService
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadAll),
      tap(() => this.loader.start()),
      switchMap(() => this.afAuth.authState.pipe(take(1))),
      switchMap((user) =>
        this.memoFileApi.loadAll(user.uid).pipe(
          take(1),
          tap(() => this.loader.complete()),
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
        this.memoFileApi.create(payload).pipe(
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
        this.memoFileApi.update(payload.changes).pipe(
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
        this.memoFileApi.delete(payload.id).pipe(
          map(() => fromActions.deleteOneSuccess({ id: payload.id })),
          catchError((error) => of(fromActions.deleteOneFail({ error })))
        )
      )
    )
  );
}
