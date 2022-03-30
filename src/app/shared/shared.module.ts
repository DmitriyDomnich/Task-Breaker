import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSphereDirective } from './directives/course-sphere.directive';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CourseSphereDirective],
  imports: [CommonModule, MatIconModule],
  exports: [CourseSphereDirective],
})
export class SharedModule {}
