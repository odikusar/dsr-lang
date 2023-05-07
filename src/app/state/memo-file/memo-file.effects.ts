import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FireApiService } from '@app/services/fire-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import * as fromReducer from '@state/memo-file/memo-file.reducer';
import * as fromSelectors from '@state/memo-file/memo-file.selectors';
import * as fromRowActions from '@state/memo-row/memo-row.actions';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import * as fromActions from './memo-file.actions';

@Injectable()
export class MemoFileEffects {
  constructor(
    private actions$: Actions,
    private fireApi: FireApiService,
    private afAuth: AngularFireAuth,
    private store: Store<fromReducer.MemoFileState>
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadAll),
      switchMap(() => this.afAuth.authState.pipe(take(1))),
      switchMap((user) =>
        this.fireApi.getMemoFiles(user.uid).pipe(
          take(1),
          switchMap((memoFiles) =>
            of(
              fromActions.loadAllSuccess({ payload: memoFiles }),
              fromActions.selectOne({ id: memoFiles[0].id })
            )
          ),
          catchError((error) => of(fromActions.loadAllFail(error)))
        )
      )
    )
  );

  selectOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.selectOne),
      switchMap((payload) => this.store.pipe(select(fromSelectors.selectById(payload.id)))),
      filter((memoFile) => !!memoFile),
      map((memoFile) => fromRowActions.loadAll({ payload: memoFile }))
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
              fromActions.selectOne({ id: memoFile.id })
            )
          ),
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
          switchMap((memoFile) =>
            of(
              fromActions.updateSuccess({ payload: { id: memoFile.id, changes: memoFile } }),
              fromActions.selectOne({ id: memoFile.id })
            )
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
          switchMap(() =>
            of(
              fromActions.deleteOneSuccess({ id: payload.id }),
              fromActions.selectOne({ id: null })
            )
          ),
          catchError((error) => of(fromActions.deleteOneFail(error)))
        )
      )
    )
  );
}
