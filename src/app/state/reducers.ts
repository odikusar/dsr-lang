import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth';
import * as fromMemoFile from './memo-file';
import * as fromRowFile from './memo-row';

export interface AppState {
  auth: fromAuth.AuthState;
  memoFile: fromMemoFile.MemoFileState;
  memoRow: fromRowFile.MemoRowState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer,
  memoFile: fromMemoFile.reducer,
  memoRow: fromRowFile.reducer,
};
