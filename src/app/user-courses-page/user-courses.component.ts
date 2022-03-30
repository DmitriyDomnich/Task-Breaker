import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PrivateCourse } from '../shared/models/course.model';
import { UserCoursesActions } from './store/user-courses.actions';
import { UserCoursesState } from './store/user-courses.reducer';
import { selectUserCourses } from './store/user-courses.selectors';

@Component({
  selector: 'user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss'],
})
export class UserCoursesComponent implements OnInit {
  courses$: Observable<ReadonlyArray<PrivateCourse>> =
    this.store.select(selectUserCourses);

  constructor(private store: Store<UserCoursesState>) {}

  ngOnInit(): void {
    this.store.dispatch({
      type: UserCoursesActions.loadCurrentUserCourses.type,
    });
  }
}
