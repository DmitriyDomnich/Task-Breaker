import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, startWith, Subscription, tap } from 'rxjs';
import { AdminViewActions } from './store/admin-view.actions';
import { AdminViewState } from './store/admin-view.reducer';

type AdminCoursePageActiveRoute = 'lections' | 'assignments' | '';

@Component({
  selector: 'admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
})
export class AdminViewComponent implements OnInit, OnDestroy {
  routerEvents$: Observable<string>;
  routeSub: Subscription;

  constructor(
    private router: Router,
    private store: Store<AdminViewState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap
      .pipe(
        tap((param) => {
          const id = param.get('id')!;
          this.store.dispatch(AdminViewActions.getAllLections({ id }));
          this.store.dispatch(AdminViewActions.getTopics({ id }));
        })
      )
      .subscribe();
    this.routerEvents$ = this.router.events.pipe(
      filter((routeChange) => routeChange instanceof NavigationEnd),
      map((router: any) => this.getActiveRoute(router.url)),
      startWith(this.getActiveRoute(this.router.url))
    );
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
  private getActiveRoute(url: string): AdminCoursePageActiveRoute {
    if (url.includes('lections')) {
      return 'lections';
    } else if (url.includes('assignments')) {
      return 'assignments';
    } else {
      return '';
    }
  }
}
