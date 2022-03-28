import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  catchError,
  filter,
  map,
  mergeAll,
  mergeMap,
  mergeWith,
  switchMap,
  tap,
  throwError,
  toArray,
} from 'rxjs';
import {
  Course,
  CourseCreate,
  PublicCourse,
} from '../shared/models/course.model';
import { Sphere } from '../store/models/sphere.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  createCourse(courseData: CourseCreate) {
    const id = this.db.createId();
    const roundRef = this.storage.ref(`courses/${id}/roundImage`);
    const landscapeRef = this.storage.ref(`courses/${id}/landscape`);

    const downloadUrls: any = {};

    return roundRef
      .put(courseData.roundImage)
      .snapshotChanges()
      .pipe(
        tap((val) => console.log(`round uploading`)),
        filter((snapshot) => snapshot?.state === 'success'),
        switchMap((_) => roundRef.getDownloadURL()),
        tap((downloadUrl) => (downloadUrls.roundImage = downloadUrl))
      )
      .pipe(
        mergeWith(
          landscapeRef
            .put(courseData.landscapeImage)
            .snapshotChanges()
            .pipe(
              tap((val) => console.log(`landscape uploading`)),
              filter((snapshot) => snapshot?.state === 'success'),
              switchMap((_) => landscapeRef.getDownloadURL()),
              tap((downloadUrl) => (downloadUrls.landscapeImage = downloadUrl))
            )
        ),
        mergeMap((_) => {
          return this.db
            .collection('courses')
            .doc(id)
            .set({
              name: courseData.name,
              public: courseData.isPublic,
              description: courseData.description,
              sphere: courseData.sphere,
              imageUrls: {
                round: `${downloadUrls.roundImage}`,
                landscape: `${downloadUrls.landscapeImage}`,
              },
            });
        })
      )
      .pipe(
        catchError((err) => throwError(() => new Error("Can't create course.")))
      );
  }

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
