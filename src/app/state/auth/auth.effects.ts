import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '@app/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import * as fromActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.init),
      switchMap(() => this.afAuth.authState.pipe(take(1))),
      switchMap((user) => {
        if (user) {
          return this.afs
            .doc<User>(`users/${user.uid}`)
            .valueChanges()
            .pipe(
              take(1),
              map((user) => fromActions.initAuthorized({ user: user })),
              catchError((error) => of(fromActions.initError(error)))
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
            this.afs
              .doc<User>(`users/${signInState.user.uid}`)
              .valueChanges()
              .pipe(
                take(1),
                tap(() => {
                  this.router.navigate(['/']);
                }),
                map((user) => fromActions.signInSuccess({ user }))
              )
          ),
          catchError((error) => {
            // this.notification.error(err.message);
            return of(fromActions.signInError(error));
          })
        )
      )
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.signOut),
      switchMap(() =>
        from(this.afAuth.signOut()).pipe(
          map(() => fromActions.signOutSuccess()),
          catchError((error) => of(fromActions.signOutError(error)))
        )
      )
    )
  );
}
