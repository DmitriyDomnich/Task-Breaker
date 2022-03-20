import { Course } from 'src/app/shared/models/course.model';

export interface CoursesCollection {
  offset: number;
  sphereName: string;
  courses: Array<Course>;
}
