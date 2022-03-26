import { Component, Input, OnInit } from '@angular/core';
import { MemoizedSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../shared/models/course.model';
import { AppState } from '../store/models/app.state';
import { CoursesCollection } from '../store/models/courses-collection.model';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  @Input() selector: MemoizedSelector<any, any>;
  courses$: Observable<CoursesCollection<any>[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.courses$ = this.store.select(this.selector);
  }
  getCoursesFromCollection<T extends Course>(
    coursesCollections: CoursesCollection<T>[]
  ): Array<T> {
    return coursesCollections
      .map((courseCollection) => courseCollection.courses)
      .flat();
  }
}
