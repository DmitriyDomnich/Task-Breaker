import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable, of, timer } from 'rxjs';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'course-joining-dialog',
  templateUrl: './course-joining-dialog.component.html',
  styleUrls: ['./course-joining-dialog.component.scss'],
})
export class CourseJoiningDialogComponent {
  course: FormControl;
  err$: Observable<Error> | null;

  joining = false;

  constructor(
    private dialogRef: MatDialogRef<CourseJoiningDialogComponent>,
    private coursesService: CoursesService,
    @Inject(MAT_DIALOG_DATA) private user: User,
    private router: Router
  ) {
    this.course = new FormControl('');
  }
  onClick() {
    this.joining = true;
    this.coursesService.joinCourse(this.course.value, this.user.uid).subscribe({
      next: (response) => {
        if (typeof response === 'string') {
          this.joining = false;
          this.err$ = of(new Error(response));
          this.removeError();
        }
        this.dialogRef.close();
        this.router.navigate(['c', this.course.value]);
      },
      error: (err) => {
        this.joining = false;
        this.err$ = of(err);
        this.removeError();
      },
    });
  }
  private removeError() {
    timer(1500).subscribe({
      complete: () => (this.err$ = null),
    });
  }
}
