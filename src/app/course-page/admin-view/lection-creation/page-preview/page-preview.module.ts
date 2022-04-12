import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundImagePreviewPipe } from './background-image-preview.pipe';
import { PagePreviewComponent } from './page-preview.component';
import { PreviewTitleDirective } from './preview-title.directive';
import { PreviewInfoDirective } from './preview-info.directive';

@NgModule({
  declarations: [
    BackgroundImagePreviewPipe,
    PagePreviewComponent,
    PreviewTitleDirective,
    PreviewInfoDirective,
  ],
  imports: [CommonModule],
  exports: [PagePreviewComponent, PreviewTitleDirective, PreviewInfoDirective],
})
export class PagePreviewModule {}
