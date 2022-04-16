import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, shareReplay, tap } from 'rxjs';
import { LectionCreationService } from '../../../admin-view/lection-creation/lection-creation.service';

@Component({
  selector: 'general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
})
export class GeneralInfoComponent implements OnInit {
  @ViewChild('topicInput') private topicInputRef: ElementRef<HTMLElement>;
  isAddingNewTopic = false;
  topics$: Observable<{ id?: string; name: string }[]>;
  selected = '';

  constructor(
    private lectionCreationService: LectionCreationService,
    private route: ActivatedRoute,
    private db: AngularFirestore
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
            console.log(topics, 'before');
            const newTopicId = this.db.createId();
            topics.push({ name: topicName, id: newTopicId });
            console.log(topics, 'after');
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
  }
}
