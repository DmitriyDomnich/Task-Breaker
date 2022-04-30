import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLectionsComponent } from './admin-lections.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { CourseItemModule } from '../../widgets/course-item/course-item.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminLectionsUpdateModule } from './admin-lections-update/admin-lections-update.module';

@NgModule({
  declarations: [AdminLectionsComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    CourseItemModule,
    AdminLectionsUpdateModule,
  ],
})
export class AdminLectionsModule {}
