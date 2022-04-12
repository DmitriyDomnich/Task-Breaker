import { Directive, ElementRef, OnInit, ViewContainerRef } from '@angular/core';

@Directive({
  selector: 'preview-title',
})
export class PreviewTitleDirective implements OnInit {
  constructor(
    private elRef: ElementRef<HTMLElement>,
    private viewContainerRef: ViewContainerRef
  ) {}
  ngOnInit(): void {
    console.log(this.viewContainerRef.element);
  }
}
