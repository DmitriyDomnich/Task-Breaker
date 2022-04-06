import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LectionCreationComponent } from './admin-view/lection-creation/lection-creation.component';
import { CourseComponent } from './course.component';

const routes: Routes = [
  {
    path: ':id',
    component: CourseComponent,
    children: [
      {
        path: 'lection-create',
        component: LectionCreationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
