import { Component, Input, OnInit } from '@angular/core';
import { GeneralInfo } from '../../models/lection.model';

@Component({
  selector: 'course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent implements OnInit {
  @Input() courseItemGeneralInfo: GeneralInfo;
  @Input() loading: boolean | null;

  constructor() {}

  ngOnInit(): void {}
}
