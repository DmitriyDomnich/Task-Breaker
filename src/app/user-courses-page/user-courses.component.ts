import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserCoursesActions } from './store/user-courses.actions';
import { UserCoursesState } from './store/user-courses.reducer';
import { selectUserCourses } from './store/user-courses.selectors';

@Component({
  selector: 'user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss'],
})
export class UserCoursesComponent implements OnInit {
  selector = selectUserCourses;
  constructor(private store: Store<UserCoursesState>) {}

  ngOnInit(): void {
    this.store.dispatch(UserCoursesActions.loadCurrentUserCourses());
  }
}
