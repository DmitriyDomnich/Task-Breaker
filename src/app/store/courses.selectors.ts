import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PublicCourse } from '../shared/models/course.model';
import { PublicCoursesState } from './public-courses.reducer';

export const publicCoursesKey = 'publicCourses';
export const selectPublicCourses =
  createFeatureSelector<PublicCoursesState>(publicCoursesKey);

export const selectError = createSelector(
  selectPublicCourses,
  ({ error }) => error?.message
);

export const selectAllSpheres = createSelector(
  selectPublicCourses,
  ({ allSpheres }) => allSpheres
);
export const selectChosenSpheresWithCourses = createSelector(
  selectPublicCourses,
  ({ chosenSpheres, courses }) => ({ chosenSpheres, courses })
);
export const selectCourse = (courseId: string) =>
  createSelector(selectPublicCourses, ({ courses }) => {
    return courses
      .reduce((acc, curr) => {
        return acc!.concat(curr.courses);
      }, Array<PublicCourse>())
      .find((val) => val.id === courseId)!;
  });

export const selectPublicFilteredCourses = createSelector(
  selectPublicCourses,
  ({ courses, chosenSpheres }) => {
    if (!chosenSpheres.length) {
      return courses.map((val) => val.courses).flat();
    }
    return chosenSpheres.reduce((acc, curr) => {
      return acc.concat(
        courses
          .filter(
            (courseCollection) => courseCollection.sphereName === curr.trim()
          )
          .map((val) => val.courses)
          .flat()
      );
    }, Array<PublicCourse>());
  }
);
