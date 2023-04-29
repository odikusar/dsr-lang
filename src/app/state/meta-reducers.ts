import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import * as fromAuthActions from '@state/auth/auth.actions';
import { AppState } from './reducers';

export function clearState(reducer: ActionReducer<AppState>) {
  return function (state: AppState, action: Action) {
    if (action.type === fromAuthActions.signOutSuccess.type) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer[] = [clearState];
