import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { UserCoursesService } from 'src/app/shared/services/user-courses.service';
import { UserCoursesActions } from './user-courses.actions';

@Injectable()
export class UserCoursesEffects {
  loadUserCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserCoursesActions.loadCurrentUserCourses),
      mergeMap((_) =>
        this.auth.user.pipe(
          switchMap((user) => {
            return this.userCoursesService.getCourses(user!.uid).pipe(
              map((courses) => ({
                type: UserCoursesActions.loadCurrentUserCoursesSuccess.type,
                courses,
              })),
              catchError((err) =>
                of({
                  type: UserCoursesActions.loadCurrentUserCoursesError.type,
                  message: err.message,
                })
              )
            );
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private auth: AngularFireAuth,
    private userCoursesService: UserCoursesService
  ) {}
}
