import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription, switchMap } from 'rxjs';
import { GeneralInfo, Topic } from '../../models/lection.model';
import { CoursePageService } from '../../services/course-page.service';
import { CourseItemOptionsDirective } from '../../widgets/course-item/directives/course-item-options.directive';

interface LoadingLection extends GeneralInfo {
  isLoading?: boolean;
}

@Component({
  selector: 'admin-lections',
  templateUrl: './admin-lections.component.html',
  styleUrls: ['./admin-lections.component.scss'],
})
export class AdminLectionsComponent implements OnInit {
  dataSub: Subscription;
  initialLections: LoadingLection[];
  filteredLections: LoadingLection[];

  topics: Topic[];
  chosenTopic: string | null = null;
  courseId: string;

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
    private coursePageService: CoursePageService,
    private router: Router,
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
          ]);
        })
      )
      .subscribe(([lections, topics]) => {
        console.log(lections);
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
