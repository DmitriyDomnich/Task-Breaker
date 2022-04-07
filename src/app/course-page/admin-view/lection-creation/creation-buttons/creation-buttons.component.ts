import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'creation-buttons',
  templateUrl: './creation-buttons.component.html',
  styleUrls: ['./creation-buttons.component.scss'],
})
export class CreationButtonsComponent implements OnInit {
  @Output() onCancel = new EventEmitter();
  @Output() onApprove = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
