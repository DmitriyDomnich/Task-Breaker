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
import { LectionLinksComponent } from './lection-creation/links/lection-links.component';
import { GeneralInfoComponent } from './lection-creation/general-info/general-info.component';
import { CreationButtonsComponent } from './lection-creation/creation-buttons/creation-buttons.component';
import { MatSelectModule } from '@angular/material/select';
import { PagePreviewModule } from './lection-creation/page-preview/page-preview.module';

@NgModule({
  declarations: [
    AdminViewComponent,
    EditorComponent,
    LectionCreationComponent,
    GeneralInfoComponent,
    LectionLinksComponent,
    CreationButtonsComponent,
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
  ],
})
export class AdminViewModule {}
