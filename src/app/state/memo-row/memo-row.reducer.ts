import { MemoRow } from '@app/models';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from './memo-row.actions';

export const adapter: EntityAdapter<MemoRow> = createEntityAdapter<MemoRow>();

export interface MemoRowState extends EntityState<MemoRow> {
  isLoading: boolean;
  isAllLoaded: boolean;
  error: Error;
  lastShownId: number;
}

export const initialState: MemoRowState = adapter.getInitialState({
  isLoading: false,
  isAllLoaded: false,
  error: null,
  lastShownId: null,
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
  on(fromActions.setSelection, (state, { payload }) =>
    adapter.setAll(
      Object.keys(state.entities).map((item) => ({
        ...state.entities[item],
        isShown: false,
        isSelected: payload.indexOf(Number(item)) !== -1,
      })),
      {
        ...state,
        isLoading: false,
        isAllLoaded: true,
        error: null,
      }
    )
  ),
  on(fromActions.setShown, (state, { id }) =>
    adapter.updateOne(
      {
        id,
        changes: {
          isShown: true,
        },
      },
      {
        ...state,
        lastShownId: id,
        isLoading: false,
        error: null,
      }
    )
  ),
  on(fromActions.loadAllFail, (state, { error }) => ({ ...state, isLoading: false, error }))
);

export function reducer(state: MemoRowState | undefined, action: Action) {
  return featureReducer(state, action);
}
