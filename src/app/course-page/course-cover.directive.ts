import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[courseCover]',
})
export class CourseCoverDirective implements OnInit {
  @Input() courseCover: string;

  @HostBinding('style.backgroundImage') get getBackgroundImage() {
    return `url(${this.courseCover})`;
  }

  constructor(private elRef: ElementRef<HTMLElement>) {}
  ngOnInit(): void {
    this.elRef.nativeElement.classList.add('cover');
  }
}
