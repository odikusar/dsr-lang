import * as fromUserActions from '@app/store/user/user.actions';
import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { AppState } from './reducers';

export function clearState(reducer: ActionReducer<AppState>) {
  return function (state: AppState, action: Action) {
    if (action.type === fromUserActions.signOutSuccess.type) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer[] = [clearState];
