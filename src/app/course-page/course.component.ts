import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, switchMap } from 'rxjs';
import { PublicCourse } from '../shared/models/course.model';
import { selectCourse } from '../store/courses.selectors';
import { AppState } from '../store/models/app.state';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  course$: Observable<PublicCourse>;
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.course$ = this.route.paramMap.pipe(
      switchMap((param) => {
        return this.store
          .select(selectCourse(param.get('id')!))
          .pipe(filter((val) => !!val));
      })
    );
  }
}
