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
import { GeneralInfo } from 'src/app/course-page/models/lection.model';
import { LectionCreationService } from '../../../admin-view/lection-creation/lection-creation.service';
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
  topics$: Observable<{ id?: string; name: string }[]>;

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
      this.topics$
        .pipe(
          tap((topics) => {
            const newTopicId = createId();
            topics.push({ name: topicName, id: newTopicId });
            this.selected = newTopicId;
          })
        )
        .subscribe();
      this.isAddingNewTopic = false;
    }
  }

  ngOnInit(): void {
    this.topics$ = this.lectionCreationService
      .getTopics(this.route.parent!.snapshot.params['id'])
      .pipe(shareReplay());
    this.lectionCreationService.createLection$
      .pipe(switchMap((_) => this.topics$))
      .subscribe((topics) =>
        this.onLectionCreationApprove.emit({
          title: this.title,
          description: this.description,
          topic: topics.find((topic) => topic.id === this.selected)!.name,
        })
      );
  }
}
