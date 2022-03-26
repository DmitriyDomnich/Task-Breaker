import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { QuerySnapshot } from 'firebase/firestore';
import { filter, map, mergeAll, mergeMap, tap, toArray } from 'rxjs';
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
        mergeMap((snapshot) => this.getCoursesFromSnapshot(snapshot)),
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
              map((snapshot) => ({
                courses: this.getCoursesFromSnapshot(snapshot),
                lastStarsValue:
                  snapshot.docs[snapshot.docs.length - 1].data().stars,
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
  private getCoursesFromSnapshot(snapshot: any) {
    return snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
  }
}
