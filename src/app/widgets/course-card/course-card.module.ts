import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from './course-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CourseCardComponent],
  imports: [CommonModule, SharedModule],
  exports: [CourseCardComponent],
})
export class CourseCardModule {}
