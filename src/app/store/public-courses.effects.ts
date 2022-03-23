import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { CoursesService } from '../courses/courses.service';
import { PublicCoursesActions } from './courses.actions';

@Injectable()
export class PublicCoursesEffects {
  loadCoursesBySphere$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicCoursesActions.loadCoursesBySphere),
      mergeMap(({ lastStarsValue, sphereName }) =>
        this.coursesService
          .getCoursesByFilteredSphere(sphereName, lastStarsValue)
          .pipe(
            map((courses) => ({
              type: PublicCoursesActions.loadCoursesBySphereSuccess.type,
              courses: courses,
              sphereName: sphereName,
            }))
          )
      )
    )
  );

  loadSpheres$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicCoursesActions.loadAllSpheres),
      mergeMap((val) =>
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
    private actions$: Actions
  ) {}
}
