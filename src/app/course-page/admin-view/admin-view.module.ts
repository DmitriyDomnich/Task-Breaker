import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminViewComponent } from './admin-view.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { EditorComponent } from './lection-creation/editor/editor.component';
import { LectionCreationComponent } from './lection-creation/lection-creation.component';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LectionCreationItemsComponent } from './lection-creation/creation-items/lection-creation-items.component';
import { GeneralInfoComponent } from './lection-creation/general-info/general-info.component';
import { CreationButtonsComponent } from './lection-creation/creation-buttons/creation-buttons.component';
import { MatSelectModule } from '@angular/material/select';
import { PagePreviewModule } from './lection-creation/page-preview/page-preview.module';
import { StoreModule } from '@ngrx/store';
import {
  creationItemsFeatureKey,
  creationItemsReducer,
} from './lection-creation/store/lection-creation.reducer';
import { PreviewsComponent } from './lection-creation/previews/previews.component';

@NgModule({
  declarations: [
    AdminViewComponent,
    EditorComponent,
    LectionCreationComponent,
    GeneralInfoComponent,
    LectionCreationItemsComponent,
    CreationButtonsComponent,
    PreviewsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    QuillModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PagePreviewModule,
    StoreModule.forFeature(creationItemsFeatureKey, creationItemsReducer),
  ],
})
export class AdminViewModule {}
