import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatestWith, map, Observable, tap } from 'rxjs';
import { GeneralInfo, Topic } from '../../models/lection.model';
import { CourseItemOptionsDirective } from '../../widgets/course-item/directives/course-item-options.directive';
import { AdminViewActions } from '../store/admin-view.actions';
import { AdminViewState } from '../store/admin-view.reducer';
import { selectLections, selectTopics } from '../store/admin-view.selectors';

export interface LoadingLection extends GeneralInfo {
  isLoading: boolean;
}
type Data = {
  lections: readonly LoadingLection[];
  topics: readonly Topic[];
};

@Component({
  selector: 'admin-lections',
  templateUrl: './admin-lections.component.html',
  styleUrls: ['./admin-lections.component.scss'],
})
export class AdminLectionsComponent implements OnInit {
  lections$ = this.store.select(selectLections);
  topics$ = this.store.select(selectTopics);
  data$: Observable<Data>;

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
    this.store.dispatch(
      AdminViewActions.deleteLectionById({ id: lection.id! })
    );
  }

  onTopicFilterChange(matSelectChange: Topic | null) {
    const topicName: any = matSelectChange?.name || null;
    this.store.dispatch(
      AdminViewActions.changeTopicToFilter({ topicToFilter: topicName })
    );
  }

  constructor(
    private route: ActivatedRoute,
    private store: Store<AdminViewState>
  ) {}

  ngOnInit(): void {
    this.data$ = this.lections$.pipe(
      combineLatestWith(this.topics$),
      map(([lections, topics]) => ({
        lections,
        topics,
      }))
    );
  }
}
