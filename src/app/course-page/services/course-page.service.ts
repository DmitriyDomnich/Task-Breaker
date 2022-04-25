import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Course } from '../../shared/models/course.model';
import { GeneralInfo } from '../models/lection.model';

@Injectable({
  providedIn: 'root',
})
export class CoursePageService {
  getCourseInfo(courseId: string): Observable<any> {
    return this.db
      .collection<Course>('courses')
      .doc<Course>(courseId)
      .get()
      .pipe(map((snapshot) => ({ id: snapshot.id, ...snapshot.data() })));
  }
  getLections(courseId: string): Observable<GeneralInfo[]> {
    return this.db
      .collection('courses')
      .doc(courseId)
      .collection<GeneralInfo>('lections')
      .get()
      .pipe(
        map((snapshot) =>
          snapshot.docs.map((docSnapshot) => ({
            id: docSnapshot.id,
            ...docSnapshot.data(),
          }))
        )
      );
  }
  constructor(private db: AngularFirestore) {}
}
