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
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { CourseCardModule } from '../widgets/course-card/course-card.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';

@NgModule({
  declarations: [UserCoursesComponent],
  imports: [
    CommonModule,
    UserCoursesRoutingModule,
    EffectsModule.forFeature([UserCoursesEffects]),
    StoreModule.forFeature(userCoursesFeatureKey, userCoursesReducer),
    CourseCardModule,
    MatFormFieldModule,
    MatSelectModule,
    SharedModule,
    MatButtonModule,
    CdkAccordionModule,
  ],
})
export class UserCoursesModule {}
