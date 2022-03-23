import { Component, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { PublicCoursesActions } from './store/courses.actions';
import { AppState } from './store/models/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private renderer: Renderer2, private store: Store<AppState>) {
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
  }
}
