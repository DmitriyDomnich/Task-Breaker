import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DocViewerService } from 'src/app/course-page/doc-viewer.service';
import { CreationPreview } from 'src/app/course-page/models/creation-preview.model';

@Directive({
  selector: '[previewOpen]',
})
export class PreviewOpenDirective {
  @Input('previewOpen') pagePreviewUrl: CreationPreview;

  constructor(
    private renderer: Renderer2,
    private docViewerService: DocViewerService
  ) {}

  @HostListener('click') onClick() {
    if (this.pagePreviewUrl.url) {
      const a = <HTMLAnchorElement>this.renderer.createElement('a');
      a.href = this.pagePreviewUrl.url;
      a.target = '_blank';
      a.click();
    } else {
      if (this.pagePreviewUrl.file?.type === 'application/pdf') {
        const fileReader = new FileReader();
        fileReader.onloadend = (e) => {
          const arrayBuffer = <ArrayBuffer>e.target?.result;
          const uint8Array = new Uint8Array(arrayBuffer);
          this.docViewerService.setDoc(uint8Array);
        };
        fileReader.readAsArrayBuffer(this.pagePreviewUrl.file);
      }
    }
  }
}
