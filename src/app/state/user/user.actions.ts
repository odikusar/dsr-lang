import { AuthCredentials, User } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const initAuth = createAction('[User] Init Auth');

export const initAuthorized = createAction('[User] Init Authorized', props<{ user: User }>());

export const initUnauthorized = createAction('[User] Init Unauthorized');

export const initFail = createAction('[User] Init Fail', props<{ error: Error }>());

export const signIn = createAction('[User] Sign In', props<{ credentials: AuthCredentials }>());

export const signInSuccess = createAction('[User] Sign In Success', props<{ user: User }>());

export const signInFail = createAction('[User] Sign In Fail', props<{ error: Error }>());

export const signOut = createAction('[User] Sign Out');

export const signOutSuccess = createAction('[User] Sign Out Success');

export const signOutFail = createAction('[User] Sign Out Fail', props<{ error: Error }>());

export const setActiveMemoFileId = createAction(
  '[User] Set Active Memo File',
  props<{ id: string }>()
);
