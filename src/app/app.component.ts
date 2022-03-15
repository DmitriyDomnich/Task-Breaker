import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private renderer: Renderer2) {
    localStorage.getItem('theme') === 'dark' &&
      (
        this.renderer.selectRootElement('body', true) as HTMLBodyElement
      ).classList.add('dark-theme');
  }
  ngOnInit(): void {}
}
