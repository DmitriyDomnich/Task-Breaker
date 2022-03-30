import { CourseCover } from './cover.model';

export interface Course {
  id: string;
  name: string;
  coverURL: string;
  isPublic: boolean;
  description?: string;
  sphere: string;
}
export interface CourseCreate extends CourseCover {
  name: string;
  isPublic: boolean;
  description?: string;
  sphere: string;
}
export interface PublicCourse extends Course {
  stars: number;
  isPublic: true;
}
