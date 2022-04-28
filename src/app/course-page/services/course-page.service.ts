import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first, from, map, Observable, tap } from 'rxjs';
import { Course } from '../../shared/models/course.model';
import { GeneralInfo, Topic } from '../models/lection.model';

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
  deleteLection(courseId: string, lectionId: string) {
    return from(
      this.db
        .collection('courses')
        .doc(courseId)
        .collection('lections')
        .doc(lectionId)
        .delete()
    ).pipe(first());
  }
  getTopics(courseId: string): Observable<Topic[]> {
    console.log(courseId);
    return this.db
      .collection('courses')
      .doc(courseId)
      .collection<{ name: string }>('topics')
      .get()
      .pipe(
        map((topicSnapshot) =>
          topicSnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
          }))
        )
      );
  }
  constructor(private db: AngularFirestore) {}
}
