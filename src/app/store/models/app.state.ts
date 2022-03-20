import { PrivateCoursesState } from '../private-courses.reducer';
import { PublicCoursesState } from '../public-courses.reducer';

export interface AppState {
  publicCourses: PublicCoursesState;
  privateCourses: PrivateCoursesState;
}
