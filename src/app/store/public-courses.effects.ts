import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CoursesService } from '../courses/courses.service';
import { PublicCoursesActions } from './courses.actions';
import { AppState } from './models/app.state';

@Injectable()
export class PublicCoursesEffects {
  loadCoursesBySphere$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicCoursesActions.loadCoursesBySphere),
      mergeMap(({ lastStarsValue, sphereName }) =>
        this.coursesService
          .getCoursesByFilteredSphere(sphereName, lastStarsValue)
          .pipe(
            map((courses) => {
              if (!courses.length) {
                throw new Error(`No more courses for ${sphereName} category.`);
              }
              return {
                type: PublicCoursesActions.loadCoursesBySphereSuccess.type,
                courses: courses,
                sphereName: sphereName,
              };
            }),
            catchError((err: Error) => {
              return of({
                type: PublicCoursesActions.loadCoursesBySphereError.type,
                message: err.message,
              });
            })
          )
      )
    )
  );

  loadSpheres$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicCoursesActions.loadAllSpheres),
      mergeMap((_) =>
        this.coursesService.getAllSpheres().pipe(
          map((spheres) => ({
            type: PublicCoursesActions.loadAllSpheresSuccess.type,
            spheres: spheres,
          }))
        )
      )
    )
  );

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicCoursesActions.loadAllTypeCourses),
      mergeMap(({ amount, courseType }) =>
        this.coursesService.getCourses(courseType, amount).pipe(
          map(({ courses, lastStarsValue }) => ({
            type: PublicCoursesActions.loadAllTypeCoursesSuccess.type,
            courses: courses,
            lastStarsValue,
          })),
          catchError((err) => {
            console.log(err);
            return of(PublicCoursesActions.loadAllTypeCoursesError);
          })
        )
      )
    )
  );

  constructor(
    private coursesService: CoursesService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}
}
