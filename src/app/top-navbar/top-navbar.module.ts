import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavbarComponent } from './top-navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationComponent } from './navigation/navigation.component';
import { ShowSmallNavDirective } from './navigation/show-small-nav.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TopNavbarComponent,
    NavigationComponent,
    ShowSmallNavDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  exports: [TopNavbarComponent],
})
export class TopNavbarModule {}
