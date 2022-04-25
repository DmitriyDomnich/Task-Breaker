import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { delay, map, tap } from 'rxjs';
import { CrudApprovalService } from './crud-approval.service';

@Component({
  selector: 'creation-buttons',
  templateUrl: './creation-buttons.component.html',
  styleUrls: ['./creation-buttons.component.scss'],
})
export class CreationButtonsComponent implements OnInit {
  @Output() onCancel = new EventEmitter();
  @Output() onApprove = new EventEmitter();
  @ViewChild('spinner', { read: ElementRef }) spinner: ElementRef<HTMLElement>;

  loading = false;
  closed = false;
  hovered = false;

  @HostListener('mouseover') onHover() {
    if (!this.loading) {
      this.hovered = true;
    }
  }
  @HostListener('mouseleave') onMouseLeave() {
    if (!this.closed && !this.loading) {
      this.hovered = false;
    }
  }
  @HostBinding('class.outline-panel') get outline() {
    return this.hovered;
  }
  @HostBinding('class.loading') get loadingClass() {
    return this.loading;
  }

  openPanel() {
    this.closed = false;
    this.elRef.nativeElement.className = 'open';
  }
  closePanel() {
    this.closed = true;
    this.elRef.nativeElement.className = 'close outline-panel';
  }
  constructor(
    private elRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private crudApprovalService: CrudApprovalService
  ) {}

  ngOnInit(): void {
    this.crudApprovalService.approved$
      .pipe(
        map((_) => {
          const spanEl = <HTMLSpanElement>this.renderer.createElement('span');
          spanEl.innerHTML = 'check_circle';
          spanEl.classList.add('material-icons-outlined', 'loaded');
          console.log(this.spinner);
          this.spinner.nativeElement.after(spanEl);
          this.spinner.nativeElement.remove();
          return spanEl;
        }),
        delay(2000),
        tap((spanEl) => {
          spanEl.remove();
          this.hovered = false;
          this.loading = false;
        })
      )
      .subscribe();
    if (window.innerWidth < 650) {
      this.hovered = true;
    }
  }
}
