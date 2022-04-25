import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, switchMap, tap } from 'rxjs';
import { InsertDynamicContentDirective } from 'src/app/shared/directives/course-based-on-role.directive';
import { AdminLectionsComponent } from '../admin-view/lections/admin-lections.component';
import { LectionModel } from '../models/lection.model';
import { CoursePageService } from '../services/course-page.service';
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
export class LectionsComponent implements OnInit {
  @ViewChild(InsertDynamicContentDirective, { static: true })
  insertDirective: InsertDynamicContentDirective;

  lections$: Observable<LectionModel[]>;
  components: CoursePageViewComponents = {
    admin: AdminLectionsComponent,
    student: StudentViewComponent,
    visitor: StudentViewComponent,
  };

  constructor(
    private courseViewLoader: CourseViewsLoaderService,
    private coursePageService: CoursePageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.root.children[0].children[0].paramMap
      .pipe(
        switchMap((param) =>
          combineLatest([
            this.courseViewLoader.getUserRoleForCourseId(param.get('id')!),
            this.coursePageService.getLections(param.get('id')!),
          ])
        ),
        tap(([role, lections]) => {
          console.log(lections);
          this.insertDirective.viewContainerRef.createComponent(
            this.courseViewLoader.getComponentByRole(role, this.components)
          );
        })
      )
      .subscribe();
  }
}
