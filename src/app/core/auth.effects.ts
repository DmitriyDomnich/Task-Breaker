import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, mergeMap, tap } from 'rxjs';
import { AuthActions } from '../store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  auth$ = createEffect(() => this.actions$.pipe(tap()));

  constructor(private auth: AngularFireAuth, private actions$: Actions) {}
}
