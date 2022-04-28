import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap, tap } from 'rxjs';
import { InsertDynamicContentDirective } from 'src/app/shared/directives/course-based-on-role.directive';
import { AdminLectionsComponent } from '../admin-view/lections/admin-lections.component';
import {
  CoursePageViewComponents,
  CourseViewsLoaderService,
} from '../services/course-views-loader.service';
import { StudentViewComponent } from '../student-view/student-view.component';

@Component({
  selector: 'lections',
  templateUrl: './lections.component.html',
  styleUrls: ['./lections.component.scss'],
})
export class LectionsComponent implements OnInit, OnDestroy {
  @ViewChild(InsertDynamicContentDirective)
  insertDirective: InsertDynamicContentDirective;

  routeSub: Subscription;
  courseId: string;

  components: CoursePageViewComponents = {
    admin: AdminLectionsComponent,
    student: StudentViewComponent,
    visitor: StudentViewComponent,
  };

  constructor(
    private courseViewLoader: CourseViewsLoaderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.root.children[0].children[0].paramMap
      .pipe(
        switchMap((param) => {
          this.courseId = param.get('id')!;
          return this.courseViewLoader.getUserRoleForCourseId(this.courseId);
        }),
        tap((role) =>
          setTimeout(() =>
            this.insertDirective.viewContainerRef.createComponent(
              this.courseViewLoader.getComponentByRole(role, this.components)
            )
          )
        )
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
