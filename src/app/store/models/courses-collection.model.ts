import { Course } from 'src/app/shared/models/course.model';

export interface CoursesCollection<T extends Course> {
  lastStarsValue: number;
  sphereName: string;
  courses: Array<T>;
}
