import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  catchError,
  EMPTY,
  filter,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { CreationPreview } from 'src/app/course-page/models/creation-preview.model';
import { PagePreviewService } from '../../page-preview.service';
import { LectionCreationActions } from '../store/lection-creation.actions';
import { CreationItemsState } from '../store/lection-creation.reducer';
import { selectAllCreationItems } from '../store/lection-creation.selectors';

@Component({
  selector: 'lection-links',
  templateUrl: './lection-creation-items.component.html',
  styleUrls: ['./lection-creation-items.component.scss'],
})
export class LectionCreationItemsComponent implements OnInit {
  creationItemsPreviews$: Observable<CreationPreview[]>;
  linkInput = '';
  linkRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  constructor(
    private pagePreviewService: PagePreviewService,
    private store: Store<CreationItemsState>
  ) {}

  ngOnInit(): void {
    this.creationItemsPreviews$ = this.store.select(selectAllCreationItems);
  }

  addFile(inputEvent: Event) {
    const file = (<HTMLInputElement>inputEvent.target).files![0];
    const filePreview: CreationPreview = {
      info: file.type,
      title: file.name,
      previewUrl: 'assets/images/file-image.png',
    };
    this.store.dispatch(LectionCreationActions.addFile(filePreview));
  }
  addLink() {
    const linkInput = this.linkInput;
    this.linkInput = '';

    this.pagePreviewService
      .checkEndpoint(linkInput)
      .pipe(
        filter((bool) => {
          if (bool) {
            return true;
          }
          throw new Error();
        }),
        catchError((err) => {
          this.store.dispatch(
            LectionCreationActions.addLink({
              info: linkInput,
              previewUrl: 'assets/images/no-link-preview.jpg',
              url: linkInput,
            })
          );
          return EMPTY;
        }),
        switchMap((_) =>
          this.pagePreviewService.getPagePreviewJSON(linkInput).pipe(
            map((previewData: any) => ({
              info: previewData.domain,
              title: previewData.title,
              previewUrl: this.formatPreviewUrl(previewData),
              url: previewData.url,
            }))
          )
        ),
        tap((linkPreview) => {
          this.store.dispatch(LectionCreationActions.addLink(linkPreview));
        })
      )
      .subscribe({
        error: (err) => console.error(err),
        complete: () => console.log('complete'),
      });
  }

  private formatPreviewUrl(value: any) {
    if (!value?.image && !value?.icon) {
      return `assets/images/no-link-preview.jpg`;
    }
    return value.image?.url ?? value.icon.url;
  }
}
