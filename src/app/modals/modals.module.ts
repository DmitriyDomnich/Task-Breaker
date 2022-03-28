import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCreationDialogComponent } from './creation-dialog/course-creation-dialog.component';
import { CourseJoiningDialogComponent } from './joining-dialog/course-joining-dialog.component';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    CourseCreationDialogComponent,
    CourseJoiningDialogComponent,
    ImageCropComponent,
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ImageCropperModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        width: '450px',
        autoFocus: 'first-tabbable',
      },
    },
  ],
})
export class ModalsModule {}
