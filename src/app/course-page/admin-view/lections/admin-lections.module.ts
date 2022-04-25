import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLectionsComponent } from './admin-lections.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [AdminLectionsComponent],
  imports: [CommonModule, RouterModule, MatButtonModule, MatMenuModule],
})
export class AdminLectionsModule {}
