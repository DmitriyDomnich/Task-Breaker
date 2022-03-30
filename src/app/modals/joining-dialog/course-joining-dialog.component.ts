import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'firebase/auth';
import { Observable, of, timer } from 'rxjs';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'course-joining-dialog',
  templateUrl: './course-joining-dialog.component.html',
  styleUrls: ['./course-joining-dialog.component.scss'],
})
export class CourseJoiningDialogComponent implements OnInit {
  course: FormControl;
  err$: Observable<Error> | null;

  joining = false;

  constructor(
    private dialogRef: MatDialogRef<CourseJoiningDialogComponent>,
    private coursesService: CoursesService,
    @Inject(MAT_DIALOG_DATA) private user: User
  ) {
    this.course = new FormControl('');
  }
  onClick() {
    this.joining = true;
    this.coursesService.joinCourse(this.course.value, this.user.uid).subscribe({
      next: (response) => {
        if (response) {
          this.joining = false;
          this.err$ = of(new Error(response));
          this.removeError();
        }
        this.dialogRef.close();
        // todo: navigate to the course
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
  ngOnInit(): void {}
}
