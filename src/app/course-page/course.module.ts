import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { CourseCoverDirective } from './course-cover.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CourseComponent, CourseCoverDirective],
  imports: [CommonModule, CourseRoutingModule, SharedModule],
})
export class CourseModule {}
