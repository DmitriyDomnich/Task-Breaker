import { Directive, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[previewOpen]',
})
export class PreviewOpenDirective {
  @Input('previewOpen') pagePreviewUrl: string | undefined;

  constructor(private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    if (this.pagePreviewUrl) {
      const a = <HTMLAnchorElement>this.renderer.createElement('a');
      a.href = this.pagePreviewUrl;
      a.target = '_blank';
      a.click();
    }
  }
}
