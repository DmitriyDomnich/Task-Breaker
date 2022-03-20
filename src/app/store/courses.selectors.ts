import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesCollection } from './models/courses-collection.model';
import { PrivateCoursesState } from './private-courses.reducer';
import { PublicCoursesState } from './public-courses.reducer';

export const publicCoursesKey = 'publicCourses';
export const privateCoursesKey = 'privateCourses';
export const selectPublicCourses =
  createFeatureSelector<PublicCoursesState>(publicCoursesKey);
export const selectPrivateCourses =
  createFeatureSelector<PrivateCoursesState>(privateCoursesKey);

export const selectPublicFilteredCourses = createSelector(
  selectPublicCourses,
  ({ courses, chosenSpheres }) => {
    if (!chosenSpheres.length) {
      return courses;
    }
    return chosenSpheres.reduce((acc, curr) => {
      return acc.concat(
        courses.filter(
          (courseCollection) => courseCollection.sphereName === curr.trim()
        )
      );
    }, Array<CoursesCollection>());
  }
);
