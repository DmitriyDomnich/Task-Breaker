import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  filter,
  map,
  mergeAll,
  mergeMap,
  of,
  skip,
  switchMap,
  take,
  tap,
  toArray,
} from 'rxjs';
import { Course, PublicCourse } from '../shared/models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private db: AngularFirestore) {}

  getCoursesByFilteredSphere(sphere: string, offset: number = 0) {
    // todo: Figure pagination
    console.log(sphere, offset);
    return this.db
      .collection<Course>('courses', (ref) =>
        ref
          .where('sphere', '==', sphere)
          .where('public', '==', true)
          .orderBy('name')
          .startAt(offset)
          .limit(3)
      )
      .get()
      .pipe(
        mergeMap((snapshot) => snapshot.docs.map((doc) => doc.data())),
        toArray()
      );
  }

  getCourses(type: boolean, amount: number) {
    return this.db
      .collection('spheres')
      .get()
      .pipe(
        map((smth) => smth.docs.map((doc) => doc.id)),
        mergeAll(),
        mergeMap((sphere) =>
          this.db
            .collection<Course>('courses', (ref) =>
              ref
                .where('sphere', '==', sphere)
                .where('public', '==', type)
                .limit(amount)
            )
            .get()
            .pipe(
              map((val) => val.docs.map((val) => val.data())),
              filter((val) => !!val.length)
            )
        )
      );
  }
}
