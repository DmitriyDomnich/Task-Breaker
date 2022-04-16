import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'creation-buttons',
  templateUrl: './creation-buttons.component.html',
  styleUrls: ['./creation-buttons.component.scss'],
})
export class CreationButtonsComponent implements OnInit {
  @Output() onCancel = new EventEmitter();
  @Output() onApprove = new EventEmitter();

  closed = false;
  hovered = false;

  @HostListener('mouseover') onHover() {
    this.hovered = true;
  }
  @HostListener('mouseleave') onMouseLeave() {
    if (!this.closed) this.hovered = false;
  }
  @HostBinding('class.outline-panel') get outline() {
    return this.hovered;
  }

  openPanel() {
    this.closed = false;
    this.elRef.nativeElement.className = 'open';
  }
  closePanel() {
    this.closed = true;
    this.elRef.nativeElement.className = 'close outline-panel';
  }
  constructor(private elRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (window.innerWidth < 650) {
      this.hovered = true;
    }
  }
}
