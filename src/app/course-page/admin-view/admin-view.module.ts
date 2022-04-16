import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminViewComponent } from './admin-view.component';
import { RouterModule } from '@angular/router';
import { LectionCreationModule } from './lection-creation/lection-creation.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AdminViewComponent],
  imports: [CommonModule, RouterModule, MatButtonModule, LectionCreationModule],
})
export class AdminViewModule {}
