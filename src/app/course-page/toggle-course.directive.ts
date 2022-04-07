import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first, tap } from 'rxjs';
import { Role } from '../shared/models/role.model';
import { CoursesService } from '../shared/services/courses.service';

@Directive({
  selector: '[toggleCourse]',
})
export class ToggleCourseDirective implements OnChanges {
  @Input('toggleCourse') role: Role;
  @Input() courseId: string;
  @Output() onRoleChange = new EventEmitter<Role>();

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private coursesService: CoursesService,
    private auth: AngularFireAuth
  ) {}

  ngOnChanges(): void {
    // console.log(this.role);

    if (this.role) {
      this.elRef.nativeElement.innerText = 'Leave course';
    } else {
      this.elRef.nativeElement.innerText = 'Join course';
    }
  }
  @HostListener('click') onClick() {
    this.auth.user
      .pipe(
        first(),
        tap((user) => {
          if (this.role) {
            this.coursesService
              .leaveCourse(this.courseId, user!.uid)
              .subscribe((_) => {
                console.log('leaving');
                this.onRoleChange.emit(null);
                this.elRef.nativeElement.innerText = 'Join course';
              });
          } else {
            this.coursesService
              .joinCourse(this.courseId, user!.uid)
              .subscribe((_) => {
                this.onRoleChange.emit('student');
                this.elRef.nativeElement.innerText = 'Leave course';
              });
          }
        })
      )
      .subscribe();
  }
}
