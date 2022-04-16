import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'preview-image',
})
export class PreviewImageDirective {
  @Input() src: string;

  constructor() {}

  @HostBinding('style.background-image') get image() {
    return `url(${this.src})`;
  }
  @HostBinding('class') className = 'img';
}
