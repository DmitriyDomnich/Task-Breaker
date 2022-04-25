import { Injectable, Type } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, of, switchMap } from 'rxjs';
import { Role } from 'src/app/shared/models/role.model';
import { CoursePageService } from './course-page.service';

export type CoursePageViewComponents = {
  visitor: Type<any>;
  student: Type<any>;
  admin: Type<any>;
};
@Injectable({
  providedIn: 'root',
})
export class CourseViewsLoaderService {
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}

  getComponentByRole(role: Role, components: CoursePageViewComponents) {
    switch (role) {
      case 'student':
        return components.student;
      case 'admin':
        return components.admin;
      default:
        return components.visitor;
    }
  }

  getUserRoleForCourseId(courseId: string): Observable<Role> {
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
}
