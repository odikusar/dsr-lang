import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserApiService } from '@app/services/api/user-api.service';
import * as fromMemoRowActions from '@app/store/memo-row/memo-row.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import * as fromActions from './user.actions';
import { UserFacade } from './user.facade';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private userApi: UserApiService,
    private userFacade: UserFacade
  ) {}

  initAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.initAuth),
      switchMap(() => this.afAuth.authState.pipe(take(1))),
      switchMap((user) => {
        if (!!user) {
          return this.userApi.load(user.uid).pipe(
            tap((user) => this.userFacade.setUserId(user.id)),
            map((user) => fromActions.initAuthorized({ user })),
            catchError((error) => of(fromActions.initFail({ error })))
          );
        } else {
          return of(fromActions.initUnauthorized());
        }
      })
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.signIn),
      switchMap((payload) =>
        from(
          this.afAuth.signInWithEmailAndPassword(
            payload.credentials.email,
            payload.credentials.password
          )
        ).pipe(
          switchMap((signInState) =>
            this.userApi.load(signInState.user.uid).pipe(
              tap((user) => this.userFacade.setUserId(user.id)),
              map((user) => fromActions.signInSuccess({ user }))
            )
          ),
          catchError((error) => of(fromActions.signInFail({ error })))
        )
      )
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.signOut),
      switchMap(() =>
        from(this.afAuth.signOut()).pipe(
          take(1),
          map(() => fromActions.signOutSuccess()),
          tap(() => this.userFacade.eraseUserId()),
          catchError((error) => of(fromActions.signOutFail({ error })))
        )
      )
    )
  );

  setActiveMemoFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.setActiveMemoFileId),
      withLatestFrom(this.userFacade.user$),
      switchMap(([{ id }, user]) =>
        this.userApi
          .update(user.id, { ...user, activeMemoFileId: id })
          .pipe(map(() => fromMemoRowActions.loadAll()))
      )
    )
  );

  updateSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateSettings),
      withLatestFrom(this.userFacade.user$),
      switchMap(([{ payload }, user]) =>
        this.userApi.update(user.id, { ...user, ...payload.changes }).pipe(
          map(() => fromActions.updateSettingsSuccess({ payload })),
          catchError((error) => of(fromActions.updateSettingsFail({ error })))
        )
      )
    )
  );
}
