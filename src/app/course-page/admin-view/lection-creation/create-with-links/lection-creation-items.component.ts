import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreationPreview } from 'src/app/course-page/models/creation-preview.model';
import { LectionCreationService } from '../lection-creation.service';
import { LectionCreationActions } from '../store/lection-creation.actions';
import { CreationItemsState } from '../store/lection-creation.reducer';
import {
  selectAllCreationItems,
  selectFiles,
  selectLinks,
} from '../store/lection-creation.selectors';

@Component({
  selector: 'lection-creation-items',
  templateUrl: './lection-creation-items.component.html',
  styleUrls: ['./lection-creation-items.component.scss'],
})
export class LectionCreationItemsComponent implements OnInit {
  creationItemsPreviews$: Observable<CreationPreview[]>;
  lectionFiles$: Observable<CreationPreview[]>;
  lectionLinks$: Observable<CreationPreview[]>;
  linkInput = '';
  linkRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  constructor(
    private store: Store<CreationItemsState>,
    public lectionCreationService: LectionCreationService
  ) {}

  ngOnInit(): void {
    this.creationItemsPreviews$ = this.store.select(selectAllCreationItems);
    this.lectionFiles$ = this.store.select(selectFiles);
    this.lectionLinks$ = this.store.select(selectLinks);
  }

  addFile(inputEvent: Event) {
    const file = (<HTMLInputElement>inputEvent.target).files![0];
    this.store.dispatch(LectionCreationActions.addFile({ file }));
  }
  addLink() {
    const linkInput = this.linkInput;
    this.linkInput = '';

    this.store.dispatch(LectionCreationActions.getPreview({ url: linkInput }));
  }
}
