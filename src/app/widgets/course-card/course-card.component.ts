import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Course, PublicCourse } from 'src/app/shared/models/course.model';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() course: PublicCourse | Course;

  @HostListener('click') onClick() {
    this.router.navigate(['c', this.course.id]);
  }

  @HostBinding('style.backgroundImage') get backgroundImage() {
    return `linear-gradient(
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.25)
    ), url(${this.course.coverURL || ''})`;
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
