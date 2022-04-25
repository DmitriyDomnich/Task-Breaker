import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[insertDynamicContent]',
})
export class InsertDynamicContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
