import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { StarsDirective } from './stars.directive';

@NgModule({
  declarations: [CoursesComponent, CourseCardComponent, StarsDirective],
  imports: [CommonModule],
  exports: [CoursesComponent],
})
export class CoursesModule {}
