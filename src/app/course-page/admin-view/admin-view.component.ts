import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs';

type AdminCoursePageActiveRoute = 'lections' | 'assignments' | '';

@Component({
  selector: 'admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
})
export class AdminViewComponent implements OnInit {
  activeRoute: AdminCoursePageActiveRoute;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.activeRoute = this.getActiveRoute(this.router.url);
    this.router.events
      .pipe(
        filter((routeChange) => routeChange instanceof NavigationEnd),
        tap(
          (router: any) => (this.activeRoute = this.getActiveRoute(router.url))
        )
      )
      .subscribe();
  }
  private getActiveRoute(url: string) {
    if (url.includes('lections')) {
      return 'lections';
    } else if (url.includes('aassignments')) {
      return 'assignments';
    } else {
      return '';
    }
  }
}
