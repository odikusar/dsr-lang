import { AuthCredentials, User } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const init = createAction('[Auth] Init');

export const initAuthorized = createAction('[Auth] Init Authorized', props<{ user: User }>());

export const initUnauthorized = createAction('[Auth] Init Unauthorized');

export const initError = createAction('[Auth] Init Unauthorized', props<{ error: Error }>());

export const signIn = createAction('[Auth] Sign In', props<{ credentials: AuthCredentials }>());

export const signInSuccess = createAction('[Auth] Sign In Success', props<{ user: User }>());

export const signInError = createAction('[Auth] Sign In Error', props<{ error: Error }>());

export const signOut = createAction('[Auth] Sign Out');

export const signOutSuccess = createAction('[Auth] Sign Out Success');

export const signOutError = createAction('[Auth] Sign Out Error', props<{ error: Error }>());
