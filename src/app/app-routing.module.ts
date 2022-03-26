import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { HomeComponent } from './home-page/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./sign-in-page/sign-in.module').then((m) => m.SignInModule),
  },
  {
    path: 'profile/:uid',
    loadChildren: () =>
      import('./profile-page/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./sign-up-page/sign-up.module').then((m) => m.SignUpModule),
  },
  {
    path: 'c',
    loadChildren: () =>
      import('./course-page/course.module').then((m) => m.CourseModule),
  },
  {
    path: 'user-courses',
    canActivate: [AngularFireAuthGuard],
    loadChildren: () =>
      import('./user-courses-page/user-courses.module').then(
        (m) => m.UserCoursesModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'top',
      relativeLinkResolution: 'corrected',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
