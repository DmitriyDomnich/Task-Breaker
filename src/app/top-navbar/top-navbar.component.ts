import { Component, OnInit, Renderer2 } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { User } from 'firebase/auth';
import { Observable, share } from 'rxjs';

@Component({
  selector: 'top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
})
export class TopNavbarComponent implements OnInit {
  user$: Observable<User>;

  constructor(private renderer: Renderer2, public auth: AngularFireAuth) {
    // this.user$ = auth.user.pipe(share());
  } //  private store: Store<User>

  onThemeChange(slideToggled: MatSlideToggleChange) {
    const body = this.renderer.selectRootElement(
      'body',
      true
    ) as HTMLBodyElement;

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
  getUserName(user: any) {
    return user.displayName ?? user.email;
  }
  ngOnInit(): void {
    // this.auth.authState.subscribe((user) => console.log(user));
  }
}
