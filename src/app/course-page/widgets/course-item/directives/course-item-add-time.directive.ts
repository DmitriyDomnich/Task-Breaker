import { formatDate } from '@angular/common';
import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'course-item-add-time',
})
export class CourseItemAddTimeDirective implements AfterViewInit {
  constructor(private elRef: ElementRef<HTMLElement>) {}
  ngAfterViewInit(): void {
    const seconds = +this.elRef.nativeElement.innerText * 1000;
    this.elRef.nativeElement.innerText = ` - ${formatDate(
      seconds,
      'short',
      'en-US'
    )}`;
  }
}
