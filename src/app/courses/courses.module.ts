import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { StarsDirective } from './stars.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CoursesComponent, CourseCardComponent, StarsDirective],
  imports: [CommonModule, SharedModule],
  exports: [CoursesComponent],
})
export class CoursesModule {}
