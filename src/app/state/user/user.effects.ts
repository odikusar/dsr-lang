import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FireApiService } from '@app/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromMemoRowActions from '@state/memo-row/memo-row.actions';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import * as fromActions from './user.actions';
import { UserFacade } from './user.facade';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private fireApi: FireApiService,
    private userFacade: UserFacade
  ) {}

  initAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.initAuth),
      switchMap(() => this.afAuth.authState.pipe(take(1))),
      switchMap((user) => {
        if (!!user) {
          return this.fireApi.getUser(user.uid).pipe(
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
            this.fireApi.getUser(signInState.user.uid).pipe(
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
        this.fireApi
          .updateUser({ ...user, activeMemoFileId: id })
          .pipe(map(() => fromMemoRowActions.loadAll()))
      )
    )
  );
}
