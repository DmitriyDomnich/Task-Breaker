import { createReducer, on } from '@ngrx/store';
import { PublicCourse } from '../shared/models/course.model';
import { PublicCoursesActions } from './courses.actions';
import { CoursesCollection } from './models/courses-collection.model';

export interface PublicCoursesState {
  courses: Array<CoursesCollection<PublicCourse>>;
  chosenSpheres: Array<string>;
  allSpheres: Array<string>;
}

const initialState: PublicCoursesState = {
  courses: [],
  allSpheres: [],
  chosenSpheres: [],
};

export const publicCoursesReducer = createReducer(
  initialState,
  on(PublicCoursesActions.filterCoursesBySpheres, (state, { spheres }) => {
    return {
      ...state,
      chosenSpheres: spheres,
    };
  }),
  on(
    PublicCoursesActions.loadCoursesBySphereSuccess,
    (state, { courses, sphereName }) => {
      if (!courses.length) {
        return state;
      }
      return {
        ...state,
        courses: state.courses.reduce((acc, curr) => {
          if (curr.sphereName === sphereName) {
            const courseCollection: CoursesCollection<PublicCourse> = {
              ...curr,
              courses: curr.courses.concat(courses),
              lastStarsValue: courses[courses.length - 1].stars,
            };
            return acc.concat(courseCollection);
          }
          return acc.concat(curr);
        }, Array<CoursesCollection<PublicCourse>>()),
      };
    }
  ),
  on(PublicCoursesActions.loadAllSpheresSuccess, (state, { spheres }) => {
    return {
      ...state,
      allSpheres: spheres,
    };
  }),
  on(
    PublicCoursesActions.loadAllTypeCoursesSuccess,
    (state, { courses, lastStarsValue }) => {
      return {
        ...state,
        courses: state.courses.concat({
          courses: courses,
          lastStarsValue,
          sphereName: courses[0].sphere,
        }),
      };
    }
  )
);
