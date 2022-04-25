import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminViewComponent } from './admin-view.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { LectionCreationModule } from './lections/lection-creation/lection-creation.module';

@NgModule({
  declarations: [AdminViewComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatTabsModule,
    LectionCreationModule,
  ],
})
export class AdminViewModule {}
