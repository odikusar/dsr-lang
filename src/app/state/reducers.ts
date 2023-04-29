import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth';

export interface AppState {
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer,
};
