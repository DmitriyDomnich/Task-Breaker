import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PublicCoursesActions } from 'src/app/store/courses.actions';
import { selectPublicFilteredCourses } from 'src/app/store/courses.selectors';
import { AppState } from '../store/models/app.state';
import { CoursesCollection } from '../store/models/courses-collection.model';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$ = this.store.select(selectPublicFilteredCourses);

  @Input() isPublic: boolean;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch({
      type: PublicCoursesActions.loadAllTypeCourses.type,
      courseType: this.isPublic,
      amount: 1,
    });
  }
  getCoursesFromCollection(
    coursesCollections: CoursesCollection[]
  ): Array<any> {
    return coursesCollections
      .map((courseCollection) => courseCollection.courses)
      .flat();
  }
}
