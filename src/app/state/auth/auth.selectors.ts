import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectState = () => createFeatureSelector<AuthState>('auth');

export const selectIsLoading = () =>
  createSelector(selectState(), (state: AuthState) => state.isLoading);

export const selectIsAuthorized = () =>
  createSelector(selectState(), (state: AuthState) => state.isAuthorized);

export const selectIsInitialized = () =>
  createSelector(selectState(), (state: AuthState) => state.isInitialized);

export const selectUser = () => createSelector(selectState(), (state: AuthState) => state.user);
