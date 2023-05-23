import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FireApiService } from '@app/services/fire-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import * as fromActions from './auth.actions';
import { AuthFacade } from './auth.facade';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private fireApi: FireApiService,
    private authFacade: AuthFacade,
    private router: Router
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.init),
      switchMap(() => this.afAuth.authState.pipe(take(1))),
      switchMap((user) => {
        if (!!user) {
          return this.fireApi.getUser(user.uid).pipe(
            tap((user) => this.authFacade.setUserId(user.id)),
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
              tap((user) => this.authFacade.setUserId(user.id)),
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
          tap(() => this.authFacade.eraseUserId()),
          catchError((error) => of(fromActions.signOutFail({ error })))
        )
      )
    )
  );
}
