import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  windowWidth: number;
  smallNavShowed = false;

  constructor(private router: Router) {}

  @HostListener('window:resize', ['$event']) onWindowResize(ev: Event) {
    this.windowWidth = innerWidth;
  }

  ngOnInit(): void {
    this.windowWidth = innerWidth;
  }
}
