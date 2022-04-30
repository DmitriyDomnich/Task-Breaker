import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLectionsUpdateComponent } from '../admin-view/lections/admin-lections-update/admin-lections-update.component';
import { LectionCreationComponent } from '../admin-view/lections/lection-creation/lection-creation.component';
import { LectionsComponent } from './lections.component';

const routes: Routes = [
  {
    path: 'create',
    component: LectionCreationComponent,
  },
  {
    path: 'update',
    component: AdminLectionsUpdateComponent,
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
