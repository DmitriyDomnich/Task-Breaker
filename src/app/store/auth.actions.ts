import { createAction } from '@ngrx/store';

export namespace AuthActions {
  export const signIn = createAction('Sign In');
  export const signOut = createAction('Sign Out');
  export const signUp = createAction('Sign Up');
}
