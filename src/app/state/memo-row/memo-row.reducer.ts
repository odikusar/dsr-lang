import { MemoRow } from '@app/models';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from './memo-row.actions';

export const adapter: EntityAdapter<MemoRow> = createEntityAdapter<MemoRow>();

export interface MemoRowState extends EntityState<MemoRow> {
  isLoading: boolean;
  isAllLoaded: boolean;
  error: Error;
}

export const initialState: MemoRowState = adapter.getInitialState({
  isLoading: false,
  isAllLoaded: false,
  error: null,
});

const featureReducer = createReducer(
  initialState,
  on(fromActions.loadAll, (state) => ({ ...state, error: null, isLoading: true })),
  on(fromActions.loadAllSuccess, (state, { payload }) =>
    adapter.setAll(payload, {
      ...state,
      isLoading: false,
      isAllLoaded: true,
      error: null,
    })
  ),
  on(fromActions.loadAllFail, (state, { error }) => ({ ...state, isLoading: false, error }))
);

export function reducer(state: MemoRowState | undefined, action: Action) {
  return featureReducer(state, action);
}
