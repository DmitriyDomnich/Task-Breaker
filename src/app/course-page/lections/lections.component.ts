import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription, switchMap, tap } from 'rxjs';
import { InsertDynamicContentDirective } from 'src/app/shared/directives/course-based-on-role.directive';
import { AdminLectionsComponent } from '../admin-view/lections/admin-lections.component';
import { GeneralInfo, Topic } from '../models/lection.model';
import { CoursePageService } from '../services/course-page.service';
import {
  CoursePageViewComponents,
  CourseViewsLoaderService,
} from '../services/course-views-loader.service';
import { StudentViewComponent } from '../student-view/student-view.component';
import { CourseItemOptionsDirective } from '../widgets/course-item/directives/course-item-options.directive';

interface LoadingLection extends GeneralInfo {
  isLoading?: boolean;
}

@Component({
  selector: 'lections',
  templateUrl: './lections.component.html',
  styleUrls: ['./lections.component.scss'],
})
export class LectionsComponent implements OnInit, OnDestroy {
  @ViewChild(InsertDynamicContentDirective)
  insertDirective: InsertDynamicContentDirective;

  // lectionsData$: Observable<[GeneralInfo[], Topic[]]>;
  dataSub: Subscription;
  initialLections: LoadingLection[];
  filteredLections: LoadingLection[];

  topics: Topic[];
  chosenTopic: string | null = null;
  courseId: string;

  components: CoursePageViewComponents = {
    admin: AdminLectionsComponent,
    student: StudentViewComponent,
    visitor: StudentViewComponent,
  };

  trackFilteredLectionsById(index: number, lection: GeneralInfo) {
    return lection.id;
  }

  checkCursor(mouseEvent: MouseEvent, optionsMenu: CourseItemOptionsDirective) {
    if (
      // if cursor leaves card, not mat menu overlay
      !(<HTMLElement>mouseEvent.relatedTarget)?.classList.contains(
        'cdk-overlay-backdrop'
      )
    ) {
      optionsMenu.opacity = 0;
    }
  }

  deleteLection(lection: LoadingLection) {
    this.coursePageService.deleteLection(this.courseId, lection.id!).subscribe({
      complete: () => {
        const indexToDelete = this.initialLections.indexOf(
          this.initialLections.find(
            (initialLection) => initialLection.id === lection.id
          )!
        );
        this.initialLections.splice(indexToDelete, 1);

        this.filteredLections = this.filterLections(
          (<any>this.chosenTopic)?.name
        );
        lection.isLoading = false;
      },
    });
  }

  onTopicFilterChange(matSelectChange: Topic | null) {
    const lectionName: any = matSelectChange?.name;
    this.filteredLections = this.filterLections(lectionName);
  }

  constructor(
    private courseViewLoader: CourseViewsLoaderService,
    private coursePageService: CoursePageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataSub = this.route.root.children[0].children[0].paramMap
      .pipe(
        switchMap((param) => {
          this.courseId = param.get('id')!;
          return combineLatest([
            this.coursePageService.getLections(this.courseId),
            this.coursePageService.getTopics(this.courseId),
            this.courseViewLoader.getUserRoleForCourseId(this.courseId),
          ]);
        }),
        tap(([, , role]) =>
          setTimeout(() =>
            this.insertDirective.viewContainerRef.createComponent(
              this.courseViewLoader.getComponentByRole(role, this.components)
            )
          )
        )
        // map(([lections, topics]) => [lections, topics])
      )
      .subscribe(([lections, topics]) => {
        this.initialLections = lections;
        this.filteredLections = lections.slice();

        this.topics = topics;
      });
  }
  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }
  private filterLections(topic: null | any) {
    return topic
      ? this.initialLections.filter((lection) => lection.topic === topic)
      : this.initialLections;
  }
}
