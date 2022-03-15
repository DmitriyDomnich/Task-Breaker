import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ShowSmallNavDirective } from './show-small-nav.directive';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  windowWidth: number;
  smallNavShowed = false;
  @ViewChild('showNav') showNavDirective: ShowSmallNavDirective;

  constructor() {}

  @HostListener('window:resize', ['$event']) onWindowResize(ev: Event) {
    this.windowWidth = innerWidth;
  }

  ngOnInit(): void {
    this.windowWidth = innerWidth;
  }
}
