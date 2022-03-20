import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course.model';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() course: Course;

  @HostBinding('style.backgroundImage') get backgroundImage() {
    return `linear-gradient(
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.25)
    ), url(${this.course.coverURL || ''})`;
  }

  constructor() {}

  ngOnInit(): void {}
}
