import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSphereDirective } from './directives/course-sphere.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CourseSphereDirective],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [CourseSphereDirective, MatButtonModule],
})
export class SharedModule {}
