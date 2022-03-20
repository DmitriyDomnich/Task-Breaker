export interface Course {
  id: string;
  name: string;
  coverURL: string;
  isPublic: boolean;
  sphere: string;
}
export interface PublicCourse extends Course {
  stars: number;
  isPublic: true;
}
export interface PrivateCourse extends Course {
  isPublic: false;
}
