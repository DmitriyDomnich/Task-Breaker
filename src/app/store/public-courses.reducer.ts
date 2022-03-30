import { createReducer, on } from '@ngrx/store';
import { Course, PublicCourse } from '../shared/models/course.model';
import { PublicCoursesActions } from './courses.actions';
import { CoursesCollection } from './models/courses-collection.model';
import { Sphere } from './models/sphere.model';

export interface PublicCoursesState {
  courses: Array<CoursesCollection<PublicCourse>>;
  chosenSpheres: Array<string>;
  allSpheres: Array<Sphere>;
  error?: {
    message: string;
  } | null;
}

const initialState: PublicCoursesState = {
  courses: [],
  allSpheres: [],
  chosenSpheres: [],
};

export const publicCoursesReducer = createReducer<PublicCoursesState>(
  initialState,
  on(PublicCoursesActions.filterCoursesBySpheres, (state, { spheres }) => {
    return {
      ...state,
      chosenSpheres: spheres,
    };
  }),
  on(PublicCoursesActions.removeSpheresFilter, (state) => {
    return {
      ...state,
      chosenSpheres: [],
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
            const courseCollection: CoursesCollection<PublicCourse | Course> = {
              ...curr,
              courses: curr.courses.concat(courses),
              lastStarsValue: courses[courses.length - 1].stars,
            };
            return acc.concat(
              <CoursesCollection<PublicCourse>>courseCollection
            );
          }
          return acc.concat(curr);
        }, Array<CoursesCollection<PublicCourse>>()),
      };
    }
  ),
  on(PublicCoursesActions.loadCoursesBySphereError, (state, { message }) => {
    return {
      ...state,
      error: {
        message,
      },
    };
  }),
  on(PublicCoursesActions.removeError, (state) => {
    return {
      ...state,
      error: null,
    };
  }),
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
