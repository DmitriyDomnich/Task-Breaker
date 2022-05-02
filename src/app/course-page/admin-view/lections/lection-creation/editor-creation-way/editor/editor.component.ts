import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { LectionCreationService } from '../../lection-creation.service';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit {
  @Output() onLectionCreationApprove = new EventEmitter<string>();
  constructor(private lectionCreationService: LectionCreationService) {}

  html = '';
  uiReady = false;

  ngOnInit(): void {
    this.lectionCreationService.createLection$.subscribe((_) =>
      this.onLectionCreationApprove.emit(this.html)
    );
  }
}
