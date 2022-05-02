import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminViewComponent } from './admin-view.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { LectionCreationModule } from './lections/lection-creation/lection-creation.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { adminViewReducer } from './store/admin-view.reducer';
import { AdminViewEffects } from './store/admin-view.effects';
import { adminViewFeatureKey } from './store/admin-view.selectors';

@NgModule({
  declarations: [AdminViewComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatTabsModule,
    LectionCreationModule,
    StoreModule.forFeature(adminViewFeatureKey, adminViewReducer),
    EffectsModule.forFeature([AdminViewEffects]),
  ],
})
export class AdminViewModule {}
