import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, mergeMap, switchMap, tap, toArray } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class UserCoursesService {
  constructor(private db: AngularFirestore) {}

  getCourses(userId: string) {
    const userCoursesIds = this.db
      .collection('users')
      .doc(userId)
      .collection('courses')
      .get()
      .pipe(map((val) => val.docs.map((doc) => doc.id)));
    return userCoursesIds.pipe(
      switchMap((coursesIds) =>
        coursesIds.map((courseId) =>
          this.db.collection<Course>('courses').doc(courseId)
        )
      ),
      mergeMap((val) => val.get()),
      map((val) => val.data()),
      toArray(),
      tap(console.log)
    );
  }
}
