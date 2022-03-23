import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PublicCoursesActions } from 'src/app/store/courses.actions';
import { selectPublicFilteredCourses } from 'src/app/store/courses.selectors';
import { PrivateCourse, PublicCourse } from '../shared/models/course.model';
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

  ngOnInit(): void {}
  getCoursesFromCollection(
    coursesCollections: CoursesCollection<PublicCourse>[]
  ): Array<any> {
    return coursesCollections
      .map((courseCollection) => courseCollection.courses)
      .flat();
  }
}
