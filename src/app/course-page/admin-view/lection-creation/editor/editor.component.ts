import {
  Component,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit {
  @Output() onEditorCancel = new EventEmitter<void>();
  constructor() {}

  html = '';
  uiReady = false;

  @HostBinding('class') get hostClass() {
    return 'host';
  }
  onApprove() {
    console.log(this.html);
  }

  ngOnInit(): void {}
}
