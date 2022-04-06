import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lection-creation',
  templateUrl: './lection-creation.component.html',
  styleUrls: ['./lection-creation.component.scss'],
})
export class LectionCreationComponent implements OnInit {
  creationWay: null | 'editor' | 'links' = null;

  constructor() {}

  ngOnInit(): void {}
}
