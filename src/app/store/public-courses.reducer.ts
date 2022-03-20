import { createReducer, on } from '@ngrx/store';
import { PublicCoursesActions } from './courses.actions';
import { CoursesCollection } from './models/courses-collection.model';

export interface PublicCoursesState {
  courses: Array<CoursesCollection>;
  chosenSpheres: Array<string>;
}

const initialState: PublicCoursesState = {
  chosenSpheres: [],
  courses: [],
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
      return {
        ...state,
        courses: state.courses.reduce((acc, curr) => {
          console.log(acc);
          if (curr.sphereName === sphereName) {
            const courseCollection: CoursesCollection = {
              ...curr,
              courses: curr.courses.concat(courses),
              offset: curr.offset + 3,
            };
            console.log(courseCollection);
            return acc.concat(courseCollection);
          }
          return acc.concat(curr);
        }, Array<CoursesCollection>()),
      };
    }
  ),
  on(PublicCoursesActions.loadAllTypeCoursesSuccess, (state, { courses }) => {
    return {
      ...state,
      courses: state.courses.concat({
        courses: courses,
        offset: 1,
        sphereName: courses[0].sphere,
      }),
    };
  })
);
