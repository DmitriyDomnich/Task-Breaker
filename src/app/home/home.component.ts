import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatChip, MatChipListChange } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { last, map, Observable, switchMap, take, tap } from 'rxjs';
import { PublicCoursesActions } from '../store/courses.actions';
import { selectPublicCourses } from '../store/courses.selectors';
import { AppState } from '../store/models/app.state';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChildren('matChip') chips: QueryList<MatChip>;
  spheres$: Observable<string[]>;
  filteredSpheres = new Set<string>();

  constructor(private db: AngularFirestore, private store: Store<AppState>) {
    this.spheres$ = db
      .collection<string[]>('spheres')
      .get()
      .pipe(map((sphereDocs) => sphereDocs.docs.map((doc) => doc.id)));
  }

  onChipListChanged({ value: spheresOn }: MatChipListChange) {
    let lastSphere: string = spheresOn[spheresOn.length - 1]?.trim();
    let setLength = this.filteredSpheres.size; // size before adding sphere
    if (lastSphere) {
      this.filteredSpheres.add(lastSphere);
    }
    this.store.dispatch(
      PublicCoursesActions.filterCoursesBySpheres({
        spheres: spheresOn,
      })
    );
    if (setLength < this.filteredSpheres.size) {
      this.store
        .select(selectPublicCourses)
        .pipe(
          take(1),
          tap((coursesCollections) =>
            this.store.dispatch(
              PublicCoursesActions.loadCoursesBySphere({
                offset: coursesCollections.courses.find(
                  ({ sphereName }) => sphereName === lastSphere
                )!.offset,
                sphereName: lastSphere,
              })
            )
          )
        )
        .subscribe();
    }
  }

  toggleChip(chip: MatChip) {
    chip.toggleSelected(true);
  }

  ngOnInit(): void {}
}
