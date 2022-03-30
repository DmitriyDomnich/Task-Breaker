import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[stars]',
})
export class StarsDirective implements OnInit {
  @Input() stars: number | null;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    if (this.stars) {
      const star = this.createElementWithStylesAndText(
        'span',
        'star',
        'stars',
        'material-icons-outlined'
      );
      const starsCount = this.createElementWithStylesAndText(
        'span',
        ` ${this.stars}`
      );
      this.renderer.appendChild(star, starsCount);
      this.renderer.appendChild(this.elRef.nativeElement, star);
    }
  }
  private createElementWithStylesAndText(
    elName: string,
    text?: string,
    ...classNames: string[]
  ) {
    const el: HTMLElement = this.renderer.createElement(elName);
    classNames?.forEach((className) => this.renderer.addClass(el, className));
    if (text) {
      this.renderer.setProperty(el, 'innerText', text);
    }
    return el;
  }
}
