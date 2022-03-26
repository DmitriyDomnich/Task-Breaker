import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCoursesComponent } from './user-courses.component';

const routes: Routes = [{ path: '', component: UserCoursesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCoursesRoutingModule { }
