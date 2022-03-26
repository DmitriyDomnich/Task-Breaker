import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { filter, take, tap } from 'rxjs';
import { PublicCoursesActions } from './store/courses.actions';
import { selectAllSpheres } from './store/courses.selectors';
import { AppState } from './store/models/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private store: Store<AppState>,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    localStorage.getItem('theme') === 'dark' &&
      (
        this.renderer.selectRootElement('body', true) as HTMLBodyElement
      ).classList.add('dark-theme');
  }
  ngOnInit(): void {
    this.store.dispatch({
      type: PublicCoursesActions.loadAllTypeCourses.type,
      courseType: true,
      amount: 1,
    });
    this.store.dispatch({ type: PublicCoursesActions.loadAllSpheres.type });
    this.store
      .select(selectAllSpheres)
      .pipe(
        filter((val) => !!val.length),
        take(1),
        tap((spheres) => {
          spheres.forEach((sphere) => {
            this.iconRegistry.addSvgIcon(
              sphere.name,
              this.sanitizer.bypassSecurityTrustResourceUrl(sphere.iconURL)
            );
          });
        })
      )
      .subscribe();
  }
}
