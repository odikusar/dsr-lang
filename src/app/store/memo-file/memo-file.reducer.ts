import { MemoFile } from '@app/models';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from './memo-file.actions';

export const adapter: EntityAdapter<MemoFile> = createEntityAdapter<MemoFile>();

export interface MemoFileState extends EntityState<MemoFile> {
  isLoading: boolean;
  isAllLoaded: boolean;
  error: Error;
  selectedId: string;
}

export const initialState: MemoFileState = adapter.getInitialState({
  isLoading: false,
  isAllLoaded: false,
  error: null,
  selectedId: null,
});

const featureReducer = createReducer(
  initialState,
  on(fromActions.loadAllSuccess, (state, { payload }) =>
    adapter.setAll(payload, {
      ...state,
      isLoading: false,
      isAllLoaded: true,
      error: null,
    })
  ),
  on(fromActions.loadAll, (state) => ({ ...state, error: null, isLoading: true })),
  on(fromActions.create, fromActions.update, fromActions.deleteOne, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(fromActions.createSuccess, (state, { payload }) =>
    adapter.upsertOne(payload, {
      ...state,
      isLoading: false,
      error: null,
    })
  ),
  on(fromActions.updateSuccess, (state, { payload }) =>
    adapter.updateOne(payload, {
      ...state,
      isLoading: false,
      error: null,
    })
  ),
  on(fromActions.deleteOneSuccess, (state, payload) => adapter.removeOne(payload.id, state)),
  on(
    fromActions.loadAllFail,
    fromActions.updateFail,
    fromActions.createFail,
    fromActions.deleteOneFail,
    (state, { error }) => ({ ...state, isLoading: false, error })
  )
);

export function reducer(state: MemoFileState | undefined, action: Action) {
  return featureReducer(state, action);
}
