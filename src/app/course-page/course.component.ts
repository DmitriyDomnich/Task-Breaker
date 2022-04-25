import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { DocViewerService } from './services/doc-viewer.service';
import { Course } from '../shared/models/course.model';
import { Role } from '../shared/models/role.model';
import { InsertDynamicContentDirective } from '../shared/directives/course-based-on-role.directive';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { CoursePageService } from './services/course-page.service';
import { StudentViewComponent } from './student-view/student-view.component';
import {
  CoursePageViewComponents,
  CourseViewsLoaderService,
} from './services/course-views-loader.service';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  @ViewChild(InsertDynamicContentDirective)
  courseViewBasedOnRole: InsertDynamicContentDirective;

  courseId: string;
  role: Role;
  components: CoursePageViewComponents = {
    admin: AdminViewComponent,
    student: StudentViewComponent,
    visitor: StudentViewComponent,
  };
  docUrl$: Observable<string | Uint8Array | null>;
  course$: Observable<Course>;

  constructor(
    private route: ActivatedRoute,
    private courseViewLoaderService: CourseViewsLoaderService,
    private coursePageService: CoursePageService,
    public docViewerService: DocViewerService
  ) {}

  ngOnInit(): void {
    const param$ = this.route.paramMap;
    param$
      .pipe(
        switchMap((param) => {
          const courseId = param.get('id')!;
          this.courseId = courseId;
          console.log(courseId);
          return this.courseViewLoaderService
            .getUserRoleForCourseId(courseId)
            .pipe(
              tap((role) => (this.role = role)),
              map((role) =>
                this.courseViewLoaderService.getComponentByRole(
                  role,
                  this.components
                )
              )
            );
        }),
        tap((component) => {
          this.loadViewDependingOnRole(component);
        })
      )
      .subscribe();
    this.course$ = param$.pipe(
      switchMap((param) =>
        this.coursePageService.getCourseInfo(param.get('id')!)
      )
    );
    this.docUrl$ = this.docViewerService.docSet$;
  }

  roleChanged(role: Role) {
    this.role = role;
    this.loadViewDependingOnRole(
      this.courseViewLoaderService.getComponentByRole(role, this.components)
    );
  }

  loadViewDependingOnRole(component: Type<any>) {
    const viewContainerRef = this.courseViewBasedOnRole.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(component);
  }
}
