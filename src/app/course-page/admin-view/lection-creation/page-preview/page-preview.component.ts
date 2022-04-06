import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'page-preview',
  templateUrl: './page-preview.component.html',
  styleUrls: ['./page-preview.component.scss'],
})
export class PagePreviewComponent implements OnInit {
  @Input() pagePreview: any;

  constructor() {}

  ngOnInit(): void {
    console.log(this.pagePreview);
  }
}
