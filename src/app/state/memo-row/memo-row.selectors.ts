import { adapter, MemoRowState } from './memo-row.reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectState = () => createFeatureSelector<MemoRowState>('memoRow');

const selectors = adapter.getSelectors();

export const selectAll = () => createSelector(selectState(), selectors.selectAll);

export const selectIsLoading = () =>
  createSelector(selectState(), (state: MemoRowState) => state.isLoading);

export const selectIsAllLoaded = () =>
  createSelector(selectState(), (state: MemoRowState) => state.isAllLoaded);
