import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first, tap } from 'rxjs';
import { CourseCreationDialogComponent } from 'src/app/modals/creation-dialog/course-creation-dialog.component';
import { CourseJoiningDialogComponent } from 'src/app/modals/joining-dialog/course-joining-dialog.component';
import { ShowSmallNavDirective } from './show-small-nav.directive';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  windowWidth: number;
  smallNavShowed = false;
  @ViewChild('menuOpen') matMenu: MatMenuTrigger;
  @ViewChild('showNav') showNavDirective: ShowSmallNavDirective;

  constructor(
    private auth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  joinCourse() {
    this.auth.user
      .pipe(
        first(),
        tap((user) => {
          if (!user) {
            this.showSnackBar();
          } else {
            this.dialog.open(CourseJoiningDialogComponent, {
              data: user,
            });
          }
        })
      )
      .subscribe();
  }
  createCourse() {
    this.auth.user
      .pipe(
        first(),
        tap((user) => {
          if (!user) {
            this.showSnackBar();
          } else {
            this.dialog.open(CourseCreationDialogComponent, {
              data: user,
            });
          }
        })
      )
      .subscribe();
  }

  showSnackBar() {
    const snackBarRef = this.snackBar.open('You have to authorize', 'Sign In', {
      duration: 4000,
    });
    snackBarRef
      .afterDismissed()
      .pipe(
        first(),
        tap(
          (dismissal) =>
            dismissal.dismissedByAction && this.router.navigateByUrl('sign-in')
        )
      )
      .subscribe();
  }

  @HostListener('window:resize', ['$event']) onWindowResize(ev: Event) {
    this.windowWidth = innerWidth;
  }

  ngOnInit(): void {
    this.windowWidth = innerWidth;
  }
}
