import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { orderBy, QueryDocumentSnapshot } from 'firebase/firestore';
import {
  filter,
  forkJoin,
  from,
  lastValueFrom,
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
import { Sphere } from '../store/models/sphere.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private db: AngularFirestore) {}

  getCoursesByFilteredSphere(sphere: string, lastStarsValue: number) {
    console.log(sphere, lastStarsValue); // todo: remove this
    return this.db
      .collection<Course>('courses', (ref) =>
        ref
          .where('sphere', '==', sphere)
          .where('public', '==', true)
          .orderBy('stars', 'desc')
          .startAfter(lastStarsValue)
          .limit(1)
      )
      .get()
      .pipe(
        mergeMap((snapshot) => snapshot.docs.map((doc) => doc.data())),
        toArray(),
        tap((val) => console.log('SERVICE', val)) // todo: remove this
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
            .collection<PublicCourse>('courses', (ref) =>
              ref
                .where('sphere', '==', sphere)
                .where('public', '==', type)
                .orderBy('stars', 'desc')
                .limit(amount)
            )
            .get()
            .pipe(
              filter((val) => !!val.docs.length),
              map((val) => ({
                courses: val.docs.map((doc) => doc.data()),
                lastStarsValue: val.docs[val.docs.length - 1].data().stars,
              }))
            )
        )
      );
  }
  getAllSpheres() {
    return this.db
      .collection<Sphere>('spheres')
      .get()
      .pipe(
        map((val) => {
          return val.docs.map((doc) => ({
            name: doc.id,
            iconURL: doc.data().iconURL,
          }));
        })
      );
  }
}
