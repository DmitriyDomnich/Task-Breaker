import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Course } from '../shared/models/course.model';

@Injectable()
export class CoursePageService {
  getCourseInfo(courseId: string): Observable<any> {
    return this.db
      .collection<Course>('courses')
      .doc<Course>(courseId)
      .get()
      .pipe(map((snapshot) => ({ id: snapshot.id, ...snapshot.data() })));
  }

  constructor(private db: AngularFirestore) {}
}
