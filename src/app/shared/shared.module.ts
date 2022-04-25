import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSphereDirective } from './directives/course-sphere.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { InsertDynamicContentDirective } from './directives/course-based-on-role.directive';

@NgModule({
  declarations: [CourseSphereDirective, InsertDynamicContentDirective],
  imports: [CommonModule],
  exports: [
    CourseSphereDirective,
    InsertDynamicContentDirective,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
})
export class SharedModule {}
