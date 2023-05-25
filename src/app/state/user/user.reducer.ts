import { User } from '@app/models';
import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from './user.actions';

export interface UserState {
  isAuthorized: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  user: User;
  error: Error;
}

export const initialState: UserState = {
  isLoading: false,
  isAuthorized: false,
  isInitialized: false,
  error: null,
  user: null,
};

const featureReducer = createReducer(
  initialState,
  on(fromActions.initAuth, fromActions.signOut, fromActions.signIn, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(fromActions.initAuthorized, fromActions.signInSuccess, (state, payload) => ({
    ...state,
    isAuthorized: true,
    user: payload.user,
    isLoading: false,
    isInitialized: true,
    error: null,
  })),
  on(fromActions.setActiveMemoFileId, (state, payload) => ({
    ...state,
    user: { ...state.user, activeMemoFileId: payload.id },
    isLoading: true,
    error: null,
  })),
  on(fromActions.initUnauthorized, (state, payload) => ({
    ...state,
    error: null,
    isLoading: false,
    isAuthorized: false,
    isInitialized: true,
  })),
  on(fromActions.signOutSuccess, () => ({
    ...initialState,
    isInitialized: true,
  })),
  on(fromActions.initFail, fromActions.signInFail, fromActions.signOutFail, (state, payload) => ({
    ...state,
    error: payload.error,
    isLoading: false,
  }))
);

export function reducer(state: UserState | undefined, action: Action) {
  return featureReducer(state, action);
}
