import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentViewComponent } from './student-view.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [StudentViewComponent],
  imports: [CommonModule, MatTabsModule],
})
export class StudentViewModule {}
