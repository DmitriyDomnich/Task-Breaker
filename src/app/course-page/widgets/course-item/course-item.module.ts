import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseItemComponent } from './course-item.component';
import { CourseItemOptionsDirective } from './directives/course-item-options.directive';
import { CourseItemAddTimeDirective } from './directives/course-item-add-time.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    CourseItemComponent,
    CourseItemOptionsDirective,
    CourseItemAddTimeDirective,
  ],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [
    CourseItemComponent,
    CourseItemOptionsDirective,
    CourseItemAddTimeDirective,
  ],
})
export class CourseItemModule {}
