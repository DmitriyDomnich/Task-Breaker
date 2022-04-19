import { Component, HostBinding, Input, OnInit } from '@angular/core';
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
  @Input() preview: CreationPreview | null;
  constructor(public store: Store<CreationItemsState>) {}

  @HostBinding('class.loading') get loadingClass() {
    return !this.preview;
  }

  removeItem(clickEvent: MouseEvent) {
    clickEvent.stopPropagation();

    this.store.dispatch(LectionCreationActions.removeItem(this.preview!));
  }

  ngOnInit(): void {}
}
