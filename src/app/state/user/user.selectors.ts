import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectState = () => createFeatureSelector<UserState>('user');

export const selectIsLoading = () =>
  createSelector(selectState(), (state: UserState) => state.isLoading);

export const selectIsAuthorized = () =>
  createSelector(selectState(), (state: UserState) => state.isAuthorized);

export const selectIsInitialized = () =>
  createSelector(selectState(), (state: UserState) => state.isInitialized);

export const selectUser = () => createSelector(selectState(), (state: UserState) => state.user);

export const selectActiveMemoFileId = () =>
  createSelector(selectState(), (state: UserState) => state.user.activeMemoFileId);

export const selectError = () => createSelector(selectState(), (state: UserState) => state.error);
