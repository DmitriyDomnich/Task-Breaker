import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatChip, MatChipListChange } from '@angular/material/chips';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, first, Observable, take, tap, timer } from 'rxjs';
import { PublicCourse } from '../shared/models/course.model';
import { PublicCoursesActions } from '../store/courses.actions';
import {
  selectAllSpheres,
  selectChosenSpheresWithCourses,
  selectError,
  selectPublicFilteredCourses,
} from '../store/courses.selectors';
import { AppState } from '../store/models/app.state';
import { CoursesCollection } from '../store/models/courses-collection.model';
import { Sphere } from '../store/models/sphere.model';

type ChosenSpheresWithCourses = {
  chosenSpheres: string[];
  courses: CoursesCollection<PublicCourse>[];
};

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('scrollPoint')
  scrollPoint: ElementRef<HTMLDivElement>;

  spheres$: Observable<Sphere[]> = this.store
    .select(selectAllSpheres)
    .pipe(tap((val) => (this.spheresNumber = val.length)));
  chosenSpheres$: Observable<ChosenSpheresWithCourses> = this.store
    .select(selectChosenSpheresWithCourses)
    .pipe(
      tap((val) => {
        const newLength = val.courses.reduce(
          (acc, curr) => acc + curr.courses.length,
          0
        );
        if (newLength > this.coursesLength) {
          if (this.scrollPoint) {
            setTimeout(() =>
              this.scrollPoint.nativeElement.scrollIntoView({
                behavior: 'smooth',
              })
            );
          }
          this.loadTimer = false;
        }
        this.coursesLength = newLength;
      })
    );
  error$ = this.store.select(selectError).pipe(
    tap((err) => {
      timer(1000)
        .pipe(
          tap((_) => {
            this.store.dispatch({
              type: PublicCoursesActions.removeError.type,
            });
            this.loadTimer = false;
          }),
          first()
        )
        .subscribe();
    })
  );
  private coursesLength = 0;
  private spheresNumber = 0;

  publicCoursesSelector = selectPublicFilteredCourses;
  loadTimer = false;

  constructor(private store: Store<AppState>, private router: Router) {
    router.events
      .pipe(
        filter((navEvent) => navEvent instanceof NavigationEnd),
        first(),
        tap((_) =>
          store.dispatch({
            type: PublicCoursesActions.removeSpheresFilter.type,
          })
        )
      )
      .subscribe();
  }

  onChipListChanged({ value: spheresOn }: MatChipListChange) {
    this.store.dispatch(
      PublicCoursesActions.filterCoursesBySpheres({
        spheres: spheresOn,
      })
    );
  }
  toggleChip(chip: MatChip) {
    chip.toggleSelected(true);
  }
  loadMoreSpheres() {
    this.loadTimer = true;
    this.chosenSpheres$
      .pipe(
        take(1),
        tap(({ chosenSpheres, courses }) =>
          chosenSpheres.forEach((sphereName) => {
            this.store.dispatch({
              type: PublicCoursesActions.loadCoursesBySphere.type,
              sphereName: sphereName.trim(),
              lastStarsValue: courses.find(
                (course) => course.sphereName === sphereName.trim()
              )?.lastStarsValue,
            });
          })
        )
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
