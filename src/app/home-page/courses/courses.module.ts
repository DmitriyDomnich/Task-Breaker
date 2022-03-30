import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { StarsDirective } from './stars.directive';
import { CourseCardModule } from 'src/app/widgets/course-card/course-card.module';

@NgModule({
  declarations: [CoursesComponent, StarsDirective],
  imports: [CommonModule, CourseCardModule],
  exports: [CoursesComponent],
})
export class CoursesModule {}
