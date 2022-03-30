import { createReducer, on } from '@ngrx/store';
import { Course } from 'src/app/shared/models/course.model';
import { UserCoursesActions } from './user-courses.actions';

export interface UserCoursesState {
  courses: ReadonlyArray<Course>;
}

export const userCoursesFeatureKey = 'user-courses';

export const userCoursesInitialState: UserCoursesState = {
  courses: [],
};

export const userCoursesReducer = createReducer(
  userCoursesInitialState,
  on(UserCoursesActions.loadCurrentUserCoursesSuccess, (state, { courses }) => {
    console.log('REDUCER');
    return {
      ...state,
      courses,
    };
  })
);
