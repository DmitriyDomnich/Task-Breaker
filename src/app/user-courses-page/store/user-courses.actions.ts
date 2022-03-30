import { createAction, props } from '@ngrx/store';
import { PrivateCourse } from 'src/app/shared/models/course.model';

export namespace UserCoursesActions {
  export const loadCurrentUserCourses = createAction(
    'Load Current User Courses'
  );
  export const loadCurrentUserCoursesSuccess = createAction(
    'Load Current User Courses Success',
    props<{
      courses: PrivateCourse[];
    }>()
  );
  export const loadCurrentUserCoursesError = createAction(
    'Load Current User Courses Error'
  );
}
