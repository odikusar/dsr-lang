import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth';
import * as fromMemoFile from './memo-file';

export interface AppState {
  auth: fromAuth.AuthState;
  memoFile: fromMemoFile.MemoFileState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer,
  memoFile: fromMemoFile.reducer,
};
