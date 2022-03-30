import { Component, Input, OnInit } from '@angular/core';
import { MemoizedSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course, PublicCourse } from '../../shared/models/course.model';
import { AppState } from '../../store/models/app.state';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  @Input() selector: MemoizedSelector<any, any>;
  courses$: Observable<Array<PublicCourse>>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.courses$ = this.store.select(this.selector);
  }
}
