import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatChip, MatChipListChange } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { first, last, map, Observable, switchMap, take, tap } from 'rxjs';
import { PublicCoursesActions } from '../store/courses.actions';
import {
  selectAllSpheres,
  selectPublicCourses,
} from '../store/courses.selectors';
import { AppState } from '../store/models/app.state';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  spheres$: Observable<string[]> = this.store.select(selectAllSpheres);
  filteredSpheres = new Set<string>();

  constructor(private store: Store<AppState>) {
    store.dispatch({ type: PublicCoursesActions.loadAllSpheres.type });
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
                lastStarsValue: coursesCollections.courses.find(
                  ({ sphereName }) => sphereName === lastSphere
                )!.lastStarsValue,
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
