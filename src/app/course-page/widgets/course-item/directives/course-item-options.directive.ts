import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'course-item-options',
  exportAs: 'courseItemOptions',
})
export class CourseItemOptionsDirective {
  constructor() {}

  @HostBinding('class') className = 'options';
  @HostBinding('style.opacity') opacity = 0;
}
