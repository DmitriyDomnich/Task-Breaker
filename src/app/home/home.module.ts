import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { CoursesModule } from '../courses/courses.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MatChipsModule, CoursesModule],
  exports: [HomeComponent],
})
export class HomeModule {}
