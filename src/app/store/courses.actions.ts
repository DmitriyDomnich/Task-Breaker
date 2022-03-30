import { createAction, props } from '@ngrx/store';
import { PublicCourse } from '../shared/models/course.model';
import { Sphere } from './models/sphere.model';

export namespace PublicCoursesActions {
  export const removeError = createAction('Remove Error');

  export const loadAllTypeCourses = createAction(
    'Load Courses',
    props<{
      courseType: boolean;
      amount: number;
    }>()
  );
  export const loadAllTypeCoursesSuccess = createAction(
    'Load Courses Success',
    props<{
      courses: PublicCourse[];
      lastStarsValue: number;
    }>()
  );
  export const loadAllTypeCoursesError = createAction('Load Courses Error');

  export const loadAllSpheres = createAction('Load Spheres');

  export const loadAllSpheresSuccess = createAction(
    'Load Spheres Success',
    props<{
      spheres: Sphere[];
    }>()
  );

  export const loadCoursesBySphere = createAction(
    'Load Courses By Sphere',
    props<{
      sphereName: string;
      lastStarsValue: number;
    }>()
  );
  export const loadCoursesBySphereSuccess = createAction(
    'Load Courses By Sphere Success',
    props<{
      courses: PublicCourse[];
      sphereName: string;
    }>()
  );
  export const loadCoursesBySphereError = createAction(
    'Load Courses By Sphere Error',
    props<{
      message: string;
    }>()
  );

  export const filterCoursesBySpheres = createAction(
    'Filter Courses By Spheres',
    props<{
      spheres: string[];
    }>()
  );
  export const removeSpheresFilter = createAction('Remove Spheres Filter');
}
