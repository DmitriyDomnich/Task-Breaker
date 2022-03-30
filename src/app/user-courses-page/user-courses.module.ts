import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCoursesRoutingModule } from './user-courses-routing.module';
import { UserCoursesComponent } from './user-courses.component';
import { CoursesModule } from '../courses/courses.module';

@NgModule({
  declarations: [UserCoursesComponent],
  imports: [CommonModule, UserCoursesRoutingModule, CoursesModule],
})
export class UserCoursesModule {}
