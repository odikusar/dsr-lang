import { AuthCredentials, User } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const init = createAction('[Auth] Init');

export const initAuthorized = createAction('[Auth] Init Authorized', props<{ user: User }>());

export const initUnauthorized = createAction('[Auth] Init Unauthorized');

export const initFail = createAction('[Auth] Init Unauthorized', props<{ error: Error }>());

export const signIn = createAction('[Auth] Sign In', props<{ credentials: AuthCredentials }>());

export const signInSuccess = createAction('[Auth] Sign In Success', props<{ user: User }>());

export const signInFail = createAction('[Auth] Sign In Fail', props<{ error: Error }>());

export const signOut = createAction('[Auth] Sign Out');

export const signOutSuccess = createAction('[Auth] Sign Out Success');

export const signOutFail = createAction('[Auth] Sign Out Fail', props<{ error: Error }>());
