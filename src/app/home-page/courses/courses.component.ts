import { Component, Input, OnChanges } from '@angular/core';
import { MemoizedSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PublicCourse } from '../../shared/models/course.model';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnChanges {
  @Input() selector: MemoizedSelector<any, any>;
  courses$: Observable<Array<PublicCourse>>;

  constructor(private store: Store) {}

  ngOnChanges(): void {
    this.courses$ = this.store.select(this.selector);
  }
}
