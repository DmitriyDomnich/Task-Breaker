import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'preview-info',
})
export class PreviewInfoDirective {
  @HostBinding('class') class = 'link-url';

  constructor() {}
}
