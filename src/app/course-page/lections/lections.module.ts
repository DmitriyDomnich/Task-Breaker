import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LectionsRoutingModule } from './lections-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LectionsComponent } from './lections.component';
import { AdminLectionsModule } from '../admin-view/lections/admin-lections.module';

@NgModule({
  declarations: [LectionsComponent],
  imports: [
    CommonModule,
    LectionsRoutingModule,
    SharedModule,
    AdminLectionsModule,
  ],
})
export class LectionsModule {}
