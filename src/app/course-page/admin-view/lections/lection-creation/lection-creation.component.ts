import { Component, OnInit } from '@angular/core';
import { LectionCreationService } from './lection-creation.service';

@Component({
  selector: 'lection-creation',
  templateUrl: './lection-creation.component.html',
  styleUrls: ['./lection-creation.component.scss'],
})
export class LectionCreationComponent implements OnInit {
  creationWay: null | 'editor' | 'links' = null;

  constructor(public lectionCreationService: LectionCreationService) {}

  ngOnInit(): void {}
}
