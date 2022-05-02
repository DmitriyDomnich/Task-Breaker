import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { first, from, map, mergeMap, switchMap, tap } from 'rxjs';
import { GeneralInfo } from '../../models/lection.model';
import { LoadingLection } from '../lections/admin-lections.component';
import { AdminViewActions } from './admin-view.actions';
import { AdminViewState } from './admin-view.reducer';
import { selectLectionById } from './admin-view.selectors';

@Injectable()
export class AdminViewEffects {
  getLections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminViewActions.getAllLections),
      mergeMap(({ id }) =>
        this.db
          .collection('courses')
          .doc(id)
          .collection<LoadingLection>('lections')
          .get()
          .pipe(
            map((snapshot) => ({
              lections: snapshot.docs.map((docSnapshot) => ({
                ...docSnapshot.data(),
                id: docSnapshot.id,
                isLoading: false,
                published: (<any>docSnapshot.data()).published.seconds, // ut : {nanoseconds: number, seconds: number}
              })),
              type: AdminViewActions.getAllLectionsSuccess.type,
            }))
          )
      )
    )
  );

  getTopics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminViewActions.getTopics),
      mergeMap(({ id }) =>
        this.db
          .collection('courses')
          .doc(id)
          .collection<{ name: string }>('topics')
          .get()
          .pipe(
            map((topicSnapshot) => ({
              type: AdminViewActions.getTopicsSuccess.type,
              topics: topicSnapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
              })),
            }))
          )
      )
    )
  );

  deleteLectionById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminViewActions.deleteLectionById),
      mergeMap(({ id }) =>
        this.route.root.children[0].children[0].paramMap.pipe(
          switchMap((param) =>
            from(
              this.db
                .collection('courses')
                .doc(param.get('id')!)
                .collection('lections')
                .doc(id)
                .delete()
            ).pipe(
              first(),
              map((_) => ({
                type: AdminViewActions.deleteLectionByIdSuccess.type,
                id,
              }))
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private store: Store<AdminViewState>
  ) {}
}
