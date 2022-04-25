import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LectionCreationComponent } from '../admin-view/lections/lection-creation/lection-creation.component';
import { LectionsComponent } from './lections.component';

const routes: Routes = [
  {
    path: 'create',
    component: LectionCreationComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: LectionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LectionsRoutingModule {}
