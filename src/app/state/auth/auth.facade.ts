import { Injectable } from '@angular/core';
import { AuthCredentials } from '@app/models';
import { Store, select } from '@ngrx/store';
import * as fromActions from '@state/auth/auth.actions';
import * as fromReducer from '@state/auth/auth.reducer';
import * as fromSelectors from '@state/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(private store: Store<fromReducer.AuthState>) {}

  userState$ = this.store.pipe(select(fromSelectors.selectState()));
  isLoading$ = this.store.pipe(select(fromSelectors.selectIsLoading()));
  isAuthorized$ = this.store.pipe(select(fromSelectors.selectIsAuthorized()));
  isInitialized$ = this.store.pipe(select(fromSelectors.selectIsInitialized()));
  user$ = this.store.pipe(select(fromSelectors.selectUser()));
  error$ = this.store.pipe(select(fromSelectors.selectError()));
  userId: string = null;

  init(): void {
    this.store.dispatch(fromActions.init());
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  eraseUserId(): void {
    this.userId = null;
  }

  signIn(credentials: AuthCredentials): void {
    this.store.dispatch(fromActions.signIn({ credentials }));
  }

  signOut(): void {
    this.store.dispatch(fromActions.signOut());
  }
}
