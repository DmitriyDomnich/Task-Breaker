import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { CrudApprovalService } from './crud-approval.service';

@Component({
  selector: 'creation-buttons',
  templateUrl: './creation-buttons.component.html',
  styleUrls: ['./creation-buttons.component.scss'],
})
export class CreationButtonsComponent implements OnInit {
  @Output() onCancel = new EventEmitter();
  @Output() onApprove = new EventEmitter();

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
    private crudApprovalService: CrudApprovalService
  ) {}

  ngOnInit(): void {
    this.crudApprovalService.approved$.subscribe((_) => (this.loading = false));
    if (window.innerWidth < 650) {
      this.hovered = true;
    }
  }
}
