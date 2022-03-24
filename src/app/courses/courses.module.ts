import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { StarsDirective } from './stars.directive';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CoursesComponent, CourseCardComponent, StarsDirective],
  imports: [CommonModule, MatIconModule, HttpClientModule],
  exports: [CoursesComponent],
})
export class CoursesModule {}
