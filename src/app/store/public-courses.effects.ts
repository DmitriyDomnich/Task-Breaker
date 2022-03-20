import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, mergeMap, of, tap } from 'rxjs';
import { CoursesService } from '../courses/courses.service';
import { PublicCoursesActions } from './courses.actions';

@Injectable()
export class PublicCoursesEffects {
  loadCoursesBySphere$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicCoursesActions.loadCoursesBySphere),
      mergeMap(({ offset, sphereName }) =>
        this.coursesService.getCoursesByFilteredSphere(sphereName, offset).pipe(
          map((courses) => ({
            type: PublicCoursesActions.loadCoursesBySphereSuccess.type,
            courses: courses,
            sphereName: sphereName,
          })),
          tap((smth) => console.log(smth))
        )
      )
    )
  );

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicCoursesActions.loadAllTypeCourses),
      mergeMap(({ amount, courseType }) =>
        this.coursesService.getCourses(courseType, amount).pipe(
          map((courses) => ({
            type: PublicCoursesActions.loadAllTypeCoursesSuccess.type,
            courses: courses,
          })),
          catchError((err) => of(PublicCoursesActions.loadAllTypeCoursesError))
        )
      )
    )
  );

  constructor(
    private coursesService: CoursesService,
    private actions$: Actions
  ) {}
}
