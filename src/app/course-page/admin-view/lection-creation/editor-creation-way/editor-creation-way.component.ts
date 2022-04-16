import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreationPreview } from 'src/app/course-page/models/creation-preview.model';
import { LectionCreationActions } from '../store/lection-creation.actions';
import { CreationItemsState } from '../store/lection-creation.reducer';
import { selectFiles } from '../store/lection-creation.selectors';

@Component({
  selector: 'editor-creation-way',
  templateUrl: './editor-creation-way.component.html',
  styleUrls: ['./editor-creation-way.component.scss'],
})
export class EditorCreationWayComponent implements OnInit {
  creationFiles$: Observable<CreationPreview[]>;

  constructor(private store: Store<CreationItemsState>) {}

  ngOnInit(): void {
    this.creationFiles$ = this.store.select(selectFiles);
  }
  addFile(inputEvent: Event) {
    const file = (<HTMLInputElement>inputEvent.target).files![0];
    this.store.dispatch(LectionCreationActions.addFile({ file }));
  }
}
