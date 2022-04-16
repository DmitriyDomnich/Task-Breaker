import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CreationPreview } from 'src/app/course-page/models/creation-preview.model';
import { LectionCreationActions } from '../../admin-view/lection-creation/store/lection-creation.actions';
import { CreationItemsState } from '../../admin-view/lection-creation/store/lection-creation.reducer';

@Component({
  selector: 'page-preview',
  templateUrl: './page-preview.component.html',
  styleUrls: ['./page-preview.component.scss'],
})
export class PagePreviewComponent implements OnInit {
  @Input() preview: CreationPreview;
  constructor(public store: Store<CreationItemsState>) {}

  removeItem(clickEvent: MouseEvent) {
    clickEvent.stopPropagation();

    this.store.dispatch(LectionCreationActions.removeItem(this.preview));
  }

  ngOnInit(): void {}
}
