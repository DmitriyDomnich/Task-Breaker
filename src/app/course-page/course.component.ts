import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { Course } from '../shared/models/course.model';
import { Role } from '../shared/models/role.model';
import { AdHostDirective } from './ad-host.directive';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { CoursePageService } from './course-page.service';
import { StudentViewComponent } from './student-view/student-view.component';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  @ViewChild(AdHostDirective, { static: true }) adHost: AdHostDirective;

  role: Role;
  course$: Observable<Course>;

  constructor(
    private route: ActivatedRoute,
    private coursePageService: CoursePageService
  ) {}

  ngOnInit(): void {
    const param$ = this.route.paramMap;
    param$
      .pipe(
        switchMap((param) =>
          this.coursePageService.getUserRoleForCourse(param.get('id')!)
        ),
        tap((role) => {
          this.role = role;
          this.loadViewDependingOnRole();
        })
      )
      .subscribe();
    this.course$ = param$.pipe(
      switchMap((param) => {
        return this.coursePageService.getCourseInfo(param.get('id')!);
      })
    );
  }

  roleChanged(role: Role) {
    this.role = role;
    this.loadViewDependingOnRole();
  }

  loadViewDependingOnRole() {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    switch (this.role) {
      case 'admin': {
        const component =
          viewContainerRef.createComponent<AdminViewComponent>(
            AdminViewComponent
          );

        break;
      }
      case 'student': {
        const component =
          viewContainerRef.createComponent<StudentViewComponent>(
            StudentViewComponent
          );

        break;
      }
      default:
        // console.log('visitor');
        break;
    }
  }
}
