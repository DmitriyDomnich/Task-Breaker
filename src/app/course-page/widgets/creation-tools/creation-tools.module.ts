import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { CreationButtonsComponent } from './creation-buttons/creation-buttons.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [GeneralInfoComponent, CreationButtonsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  exports: [GeneralInfoComponent, CreationButtonsComponent],
})
export class CreationToolsModule {}
