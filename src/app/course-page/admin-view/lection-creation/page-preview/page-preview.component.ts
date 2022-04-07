import {
  Component,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'page-preview',
  templateUrl: './page-preview.component.html',
  styleUrls: ['./page-preview.component.scss'],
})
export class PagePreviewComponent implements OnInit {
  @Input() pagePreview: any;

  constructor(private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    const a = <HTMLAnchorElement>this.renderer.createElement('a');
    a.href = this.pagePreview.url;
    a.target = '_blank';
    a.click();
  }

  ngOnInit(): void {
    console.log(this.pagePreview);
  }
}
