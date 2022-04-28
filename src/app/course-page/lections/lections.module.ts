import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LectionsRoutingModule } from './lections-routing.module';
import { AdminLectionsModule } from '../admin-view/lections/admin-lections.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LectionsComponent } from './lections.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CourseItemModule } from '../widgets/course-item/course-item.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [LectionsComponent],
  imports: [
    CommonModule,
    LectionsRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    AdminLectionsModule,
    CourseItemModule,
  ],
})
export class LectionsModule {}
