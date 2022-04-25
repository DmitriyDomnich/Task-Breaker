import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course.component';

const routes: Routes = [
  {
    path: ':id',
    component: CourseComponent,
    children: [
      {
        path: 'lections',
        loadChildren: () =>
          import('./lections/lections.module').then((m) => m.LectionsModule),
      },
      {
        path: 'assignments',
        loadChildren: () =>
          import('./assignments/assignments.module').then(
            (m) => m.AssignmentsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
