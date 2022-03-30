import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCoursesRoutingModule } from './user-courses-routing.module';
import { UserCoursesComponent } from './user-courses.component';
import { StoreModule } from '@ngrx/store';
import {
  userCoursesFeatureKey,
  userCoursesReducer,
} from './store/user-courses.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserCoursesEffects } from './store/user-courses.effects';
import { CoursesModule } from '../home-page/courses/courses.module';

@NgModule({
  declarations: [UserCoursesComponent],
  imports: [
    CommonModule,
    UserCoursesRoutingModule,
    EffectsModule.forFeature([UserCoursesEffects]),
    StoreModule.forFeature(userCoursesFeatureKey, userCoursesReducer),
    CoursesModule,
  ],
})
export class UserCoursesModule {}
