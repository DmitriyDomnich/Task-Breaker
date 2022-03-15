import {
  AfterViewInit,
  Directive,
  EmbeddedViewRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[showSmallNav]',
  exportAs: 'showNav',
})
export class ShowSmallNavDirective implements AfterViewInit {
  @Input('showSmallNav') smallNavTemplate: TemplateRef<any>;
  private embeddedView: EmbeddedViewRef<any>;
  private shown = false;
  private body: HTMLBodyElement;
  private toolbar: HTMLElement;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.body = this.renderer.selectRootElement('body', true);
    this.toolbar = this.renderer.selectRootElement('mat-toolbar', true);
  }

  @HostListener('click') onClick() {
    if (this.shown && !this.embeddedView.destroyed) {
      this.closeTab();
    } else if (
      this.embeddedView === undefined ||
      (!this.shown && this.embeddedView.destroyed)
    ) {
      this.embeddedView = this.viewContainerRef.createEmbeddedView(
        this.smallNavTemplate
      );
      const [burger] = this.embeddedView.rootNodes as Array<HTMLElement>;
      burger.style.top = `${this.toolbar.clientHeight}px`;
      burger.style.height = '0';
      this.body.prepend(burger);
      burger.ontransitionend = (ev: TransitionEvent) => {
        if (ev.propertyName !== 'height') return;
        this.shown = !this.shown;
      };
      setTimeout(() => {
        burger.style.height = '20%';
      });
    }
  }
  closeTab() {
    const [burger] = this.embeddedView.rootNodes as Array<HTMLElement>;

    burger.ontransitionend = (ev: TransitionEvent) => {
      if (ev.propertyName !== 'height') return;
      this.embeddedView.destroy();
      this.shown = !this.shown;
    };

    burger.style.height = '0';
  }
}
