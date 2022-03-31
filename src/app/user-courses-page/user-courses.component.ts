import { CdkAccordionItem } from '@angular/cdk/accordion';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../shared/models/course.model';
import { UserCoursesActions } from './store/user-courses.actions';
import { UserCoursesState } from './store/user-courses.reducer';
import { selectUserCourses } from './store/user-courses.selectors';

@Component({
  selector: 'user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss'],
})
export class UserCoursesComponent implements OnInit {
  courses$: Observable<ReadonlyArray<Course>> = this.store.select(
    selectUserCourses(null)
  );

  onChange(matSelectChange: MatSelectChange) {
    this.courses$ = this.store.select(selectUserCourses(matSelectChange.value));
  }

  constructor(private store: Store<UserCoursesState>) {}

  toggleInfo(
    click: MouseEvent,
    accordeonItem: CdkAccordionItem,
    infoEl: HTMLElement
  ) {
    click.stopPropagation();
    if (accordeonItem.expanded) {
      infoEl.classList.add('course-closed');
      setTimeout(() => {
        infoEl.classList.remove('course-expanded');
        infoEl.classList.remove('course-closed');
        accordeonItem.close();
      }, 250);
    } else {
      accordeonItem.open();
      infoEl.classList.add('course-expanded');
    }
  }

  ngOnInit(): void {
    this.store.dispatch(UserCoursesActions.loadCurrentUserCourses());
  }
}
