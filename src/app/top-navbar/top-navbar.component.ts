import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {

  constructor(
    private renderer: Renderer2
  ) { }

  onThemeChange(slideToggled: MatSlideToggleChange) {
    const body = this.renderer.selectRootElement('body', true) as HTMLBodyElement;

    if (slideToggled.checked) {
      localStorage.setItem('theme', 'dark');
      body.classList.add('dark-theme');
    } else {
      localStorage.setItem('theme', 'light');
      body.classList.remove('dark-theme');
    }
  }
  getThemeState(): boolean {
    return localStorage.getItem('theme') === 'light' ? false : true;
  }

  ngOnInit(): void {
  }

}
