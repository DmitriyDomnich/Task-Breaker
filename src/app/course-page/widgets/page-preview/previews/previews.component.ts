import { Component, Input, OnInit } from '@angular/core';
import { CreationPreview } from 'src/app/course-page/models/creation-preview.model';

@Component({
  selector: 'previews',
  templateUrl: './previews.component.html',
  styleUrls: ['./previews.component.scss'],
})
export class PreviewsComponent implements OnInit {
  @Input() previews: CreationPreview[] | null;

  constructor() {}

  ngOnInit(): void {}
}
