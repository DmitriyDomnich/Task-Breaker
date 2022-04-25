import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, shareReplay, switchMap, tap } from 'rxjs';
import { GeneralInfo, Topic } from 'src/app/course-page/models/lection.model';
import { LectionCreationService } from '../../../admin-view/lections/lection-creation/lection-creation.service';
import { v4 as createId } from 'uuid';

@Component({
  selector: 'general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
})
export class GeneralInfoComponent implements OnInit {
  @ViewChild('topicInput') private topicInputRef: ElementRef<HTMLElement>;

  @Output() onLectionCreationApprove = new EventEmitter<GeneralInfo>();

  isAddingNewTopic = false;
  topics: Topic[];

  title = '';
  selected = '';
  description = '';

  constructor(
    private lectionCreationService: LectionCreationService,
    private route: ActivatedRoute
  ) {}

  createTopic() {
    this.isAddingNewTopic = true;
    setTimeout(() => this.topicInputRef.nativeElement.focus());
  }
  onTopicCreated(topicName: string) {
    if (topicName.length) {
      const newTopicId = createId();
      this.topics.push({ name: topicName, id: newTopicId });
      this.selected = newTopicId;

      this.isAddingNewTopic = false;
    }
  }

  ngOnInit(): void {
    const courseIdRoute = this.route.root.children[0].children[0];
    this.lectionCreationService
      .getTopics(courseIdRoute.snapshot.params['id'])
      .pipe(tap((topics) => (this.topics = topics)))
      .subscribe();
    this.lectionCreationService.createLection$
      .pipe(
        tap((_) =>
          this.onLectionCreationApprove.emit({
            title: this.title,
            description: this.description,
            topic: this.topics.find((topic) => topic.id === this.selected)!,
          })
        )
      )
      .subscribe();
  }
}
