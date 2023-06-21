import { MemoFileState, adapter } from './memo-file.reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectState = () => createFeatureSelector<MemoFileState>('memoFile');

const selectors = adapter.getSelectors();

export const selectAll = () => createSelector(selectState(), selectors.selectAll);

export const selectIsLoading = () =>
  createSelector(selectState(), (state: MemoFileState) => state.isLoading);

export const selectIsAllLoaded = () =>
  createSelector(selectState(), (state: MemoFileState) => state.isAllLoaded);

export const selectEntities = () => createSelector(selectState(), selectors.selectEntities);

export const selectById = (id: string) =>
  createSelector(selectEntities(), (entities) => entities[id]);
