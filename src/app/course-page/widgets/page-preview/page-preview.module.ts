import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagePreviewComponent } from './page-preview.component';
import { PreviewTitleDirective } from './directives/preview-title.directive';
import { PreviewInfoDirective } from './directives/preview-info.directive';
import { PreviewOpenDirective } from './directives/preview-open.directive';
import { PreviewImageDirective } from './directives/preview-image.directive';
import { MatButtonModule } from '@angular/material/button';
import { PreviewsComponent } from './previews/previews.component';

@NgModule({
  declarations: [
    PagePreviewComponent,
    PreviewsComponent,
    PreviewTitleDirective,
    PreviewInfoDirective,
    PreviewOpenDirective,
    PreviewImageDirective,
  ],
  imports: [CommonModule, MatButtonModule],
  exports: [
    PagePreviewComponent,
    PreviewsComponent,
    PreviewTitleDirective,
    PreviewInfoDirective,
    PreviewOpenDirective,
    PreviewImageDirective,
  ],
})
export class PagePreviewModule {}
