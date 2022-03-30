import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'firebase/auth';
import { first, map, Observable, of, switchMap, tap, timer } from 'rxjs';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { CourseCreate } from 'src/app/shared/models/course.model';
import { CourseCover } from 'src/app/shared/models/cover.model';
import { selectAllSpheres } from 'src/app/store/courses.selectors';
import { AppState } from 'src/app/store/models/app.state';
import { ImageCropComponent } from '../image-crop/image-crop.component';

@Component({
  selector: 'course-creation-dialog',
  templateUrl: './course-creation-dialog.component.html',
  styleUrls: ['./course-creation-dialog.component.scss'],
})
export class CourseCreationDialogComponent {
  formGroup: FormGroup;
  courseCover: CourseCover = {};
  imageChangeEvent: any;

  courseCreating = false;
  creationError$: Observable<Error> | null;

  spheres$: Observable<string[]> = this.store
    .select(selectAllSpheres)
    .pipe(map((spheres) => spheres.map((sphere) => sphere.name)));

  constructor(
    public dialogRef: MatDialogRef<CourseCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private coursesService: CoursesService
  ) {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      sphere: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      isPublic: new FormControl(true),
    });
  }

  onImageInput(inputEvent: any) {
    this.imageChangeEvent = inputEvent;
    const dialogRef = this.dialog.open(ImageCropComponent, {
      data: inputEvent,
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((roundBase64: string) => {
          this.courseCover.landscapeImage = inputEvent.target.files[0];
          return fetch(roundBase64);
        }),
        switchMap((response) => response.blob()),
        tap((roundBlob) => (this.courseCover.roundImage = roundBlob))
      )
      .subscribe();
  }
  onSubmit(ev: SubmitEvent) {
    ev.preventDefault();
    this.courseCreating = true;

    const courseData: CourseCreate = {
      name: this.name.value,
      sphere: this.sphere.value,
      description: this.formGroup.get('description')!.value,
      isPublic: this.formGroup.get('isPublic')!.value,
      roundImage: this.courseCover.roundImage,
      landscapeImage: this.courseCover.landscapeImage,
    };
    console.log(courseData);
    this.coursesService.createCourse(courseData, this.user.uid).subscribe({
      error: (err) => {
        console.error(err);
        this.courseCreating = false;
        this.creationError$ = of(new Error(err.message));
        timer(1500)
          .pipe(first())
          .subscribe((_) => (this.creationError$ = null));
      },
      complete: () => {
        console.log('upload');
        this.dialogRef.close();
      },
    });
  }

  get name() {
    return <FormControl>this.formGroup.get('name');
  }
  get sphere() {
    return <FormControl>this.formGroup.get('sphere');
  }
}
