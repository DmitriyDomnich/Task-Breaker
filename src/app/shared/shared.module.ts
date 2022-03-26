import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSphereDirective } from './directives/course-sphere.directive';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CourseSphereDirective],
  imports: [CommonModule, MatIconModule, HttpClientModule],
  exports: [CourseSphereDirective],
})
export class SharedModule {}
