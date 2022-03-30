import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, Observable, switchMap } from 'rxjs';
import { Course, PublicCourse } from '../shared/models/course.model';
import { selectCourse } from '../store/courses.selectors';
import { CoursePageService } from './course-page.service';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  course$: Observable<Course>;
  constructor(
    private route: ActivatedRoute,
    private coursePageService: CoursePageService
  ) {}

  ngOnInit(): void {
    this.course$ = this.route.paramMap.pipe(
      switchMap((param) => {
        return this.coursePageService.getCourseInfo(param.get('id')!);
      })
    );
  }
}
