import { ActionReducerMap } from '@ngrx/store';
import * as fromMemoFile from './memo-file';
import * as fromRowFile from './memo-row';
import * as fromUser from './user';

export interface AppState {
  user: fromUser.UserState;
  memoFile: fromMemoFile.MemoFileState;
  memoRow: fromRowFile.MemoRowState;
}

export const reducers: ActionReducerMap<AppState> = {
  user: fromUser.reducer,
  memoFile: fromMemoFile.reducer,
  memoRow: fromRowFile.reducer,
};
