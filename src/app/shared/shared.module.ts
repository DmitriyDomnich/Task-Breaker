import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSphereDirective } from './directives/course-sphere.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CourseSphereDirective],
  imports: [CommonModule],
  exports: [CourseSphereDirective, MatButtonModule, MatIconModule, FormsModule],
})
export class SharedModule {}
