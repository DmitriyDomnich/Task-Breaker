import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { CourseCoverDirective } from './course-cover.directive';
import { SharedModule } from '../shared/shared.module';
import { AdHostDirective } from './ad-host.directive';
import { ToggleCourseDirective } from './toggle-course.directive';
import { AdminViewModule } from './admin-view/admin-view.module';
import { StudentViewModule } from './student-view/student-view.module';

@NgModule({
  declarations: [
    CourseComponent,
    CourseCoverDirective,
    AdHostDirective,
    ToggleCourseDirective,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule,
    AdminViewModule,
    StudentViewModule,
  ],
})
export class CourseModule {}
