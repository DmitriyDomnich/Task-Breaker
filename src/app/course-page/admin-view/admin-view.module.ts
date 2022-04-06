import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminViewComponent } from './admin-view.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { EditorComponent } from './lection-creation/editor/editor.component';
import { LectionCreationComponent } from './lection-creation/lection-creation.component';
import { MatRippleModule } from '@angular/material/core';
import { GeneralInfoComponent } from './lection-creation/general-info/general-info.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { LectionLinksComponent } from './lection-creation/links/lection-links.component';
import { PagePreviewService } from './page-preview.service';
import { PagePreviewComponent } from './lection-creation/page-preview/page-preview.component';
import { BackgroundImagePreviewPipe } from './lection-creation/page-preview/background-image-preview.pipe';

@NgModule({
  declarations: [
    AdminViewComponent,
    EditorComponent,
    LectionCreationComponent,
    GeneralInfoComponent,
    LectionLinksComponent,
    PagePreviewComponent,
    BackgroundImagePreviewPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    QuillModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
  ],
  providers: [PagePreviewService],
})
export class AdminViewModule {}
