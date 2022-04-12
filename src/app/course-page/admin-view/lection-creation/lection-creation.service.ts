import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, map } from 'rxjs';
import { Lection } from '../../models/lection.model';

@Injectable({ providedIn: 'root' })
export class LectionCreationService {
  lection$ = new BehaviorSubject<Lection | null>(null);

  constructor(private db: AngularFirestore) {}

  createLection(lection: Lection) {
    this.lection$.next(lection);
  }
  getTopics(courseId: string) {
    console.log(courseId);
    return this.db
      .collection('courses')
      .doc(courseId)
      .collection('topics')
      .get()
      .pipe(
        map((topicSnapshot) =>
          topicSnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data()['name'],
          }))
        )
      );
  }
}
