import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, of, switchMap } from 'rxjs';
import { Course } from '../shared/models/course.model';
import { Role } from '../shared/models/role.model';

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
  getUserRoleForCourse(courseId: string): Observable<Role> {
    return this.auth.user.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection('courses')
            .doc(courseId)
            .collection<{ role: 'admin' | 'student' }>('users')
            .doc(user.uid)
            .get()
            .pipe(
              map((userSnapshot) => {
                if (userSnapshot.exists) {
                  return userSnapshot.data()!.role;
                }
                return null;
              })
            );
        }
        return of(null);
      })
    );
  }
  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {}
}
