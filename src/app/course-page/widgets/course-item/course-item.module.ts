import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseItemComponent } from './course-item.component';
import { CourseItemOptionsDirective } from './directives/course-item-options.directive';

@NgModule({
  declarations: [CourseItemComponent, CourseItemOptionsDirective],
  imports: [CommonModule],
  exports: [CourseItemComponent, CourseItemOptionsDirective],
})
export class CourseItemModule {}
