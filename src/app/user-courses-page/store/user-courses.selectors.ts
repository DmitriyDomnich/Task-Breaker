import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  userCoursesFeatureKey,
  UserCoursesState,
} from './user-courses.reducer';

export const selectUserCoursesFeatureKey =
  createFeatureSelector<UserCoursesState>(userCoursesFeatureKey);

// true - public, false - private
export const selectUserCourses = (filter: boolean | null) =>
  createSelector(selectUserCoursesFeatureKey, ({ courses }) => {
    if (filter !== null) {
      return courses.filter((course) => course.isPublic === filter);
    }
    return courses;
  });
