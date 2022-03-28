import {
  Directive,
  Input,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Directive({
  selector: '[courseSphere]',
})
export class CourseSphereDirective implements OnInit {
  @Input() courseSphere: string;
  @Input() position: string = 'left';
  @Input() fontSize: number;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    const matIconRef = this.viewContainerRef.createComponent(MatIcon);
    matIconRef.instance.svgIcon = this.courseSphere;
    const icon = matIconRef.instance._elementRef.nativeElement;
    this.renderer.addClass(icon, 'course-sphere');
    if (this.position !== 'left') {
      this.renderer.setStyle(icon, this.position, '0');
      this.renderer.setStyle(icon, 'margin-right', '.75rem');
    }
    if (this.fontSize) {
      this.renderer.setStyle(icon, 'height', this.fontSize + 'px');
      this.renderer.setStyle(icon, 'width', this.fontSize + 'px');
    }
  }
}
