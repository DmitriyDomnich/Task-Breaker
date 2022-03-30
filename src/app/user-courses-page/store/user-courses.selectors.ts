import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  userCoursesFeatureKey,
  UserCoursesState,
} from './user-courses.reducer';

export const selectUserCoursesFeatureKey =
  createFeatureSelector<UserCoursesState>(userCoursesFeatureKey);

export const selectUserCourses = createSelector(
  selectUserCoursesFeatureKey,
  ({ courses }) => {
    return courses;
  }
);
