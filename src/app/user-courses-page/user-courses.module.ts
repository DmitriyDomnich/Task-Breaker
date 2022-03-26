import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCoursesRoutingModule } from './user-courses-routing.module';
import { UserCoursesComponent } from './user-courses.component';


@NgModule({
  declarations: [
    UserCoursesComponent
  ],
  imports: [
    CommonModule,
    UserCoursesRoutingModule
  ]
})
export class UserCoursesModule { }
