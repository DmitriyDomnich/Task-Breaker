import {
  Directive,
  EmbeddedViewRef,
  HostListener,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[showSmallNav]',
})
export class ShowSmallNavDirective {
  @Input('showSmallNav') smallNavTemplate: TemplateRef<any>;
  private embeddedView: EmbeddedViewRef<any>;
  private shown = false;

  constructor(private viewContainerRef: ViewContainerRef) {}

  @HostListener('click') onClick() {
    if (this.shown && !this.embeddedView.destroyed) {
      const [listElement] = this.embeddedView.rootNodes;

      listElement.ontransitionend = (ev: TransitionEvent) => {
        this.embeddedView.destroy();
        this.shown = !this.shown;
      };

      listElement.style.height = '0';
    } else if (
      this.embeddedView === undefined ||
      (!this.shown && this.embeddedView.destroyed)
    ) {
      this.embeddedView = this.viewContainerRef.createEmbeddedView(
        this.smallNavTemplate
      );
      const [listElement] = this.embeddedView.rootNodes;
      listElement.style.height = '0';
      listElement.ontransitionend = (ev: TransitionEvent) => {
        this.shown = !this.shown;
      };
      setTimeout(() => {
        listElement.style.height = '20%';
      });
    }
  }
}
