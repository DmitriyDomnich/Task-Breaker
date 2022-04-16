import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { PagePreviewService } from '../../page-preview.service';
import { LectionCreationActions } from './lection-creation.actions';
import { v4 as createId } from 'uuid';

@Injectable()
export class LectionCreationEffects {
  addLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LectionCreationActions.getPreview),
      mergeMap(({ url }) =>
        this.pagePreviewService.checkEndpoint(url).pipe(
          switchMap((exists) => {
            if (exists) {
              return this.pagePreviewService.getPagePreviewJSON(url).pipe(
                tap(console.log),
                map((previewData: any) => ({
                  type: LectionCreationActions.addLink.type,
                  link: {
                    info: previewData.domain,
                    title: previewData.title,
                    previewUrl: this.formatPreviewUrl(previewData),
                    url: previewData.url,
                    previewType: 'link',
                    id: createId(),
                  },
                }))
              );
            }
            return of({
              type: LectionCreationActions.addLink.type,
              link: {
                info: url,
                previewUrl: 'assets/images/no-link-preview.jpg',
                url,
                previewType: 'link',
                id: createId(),
              },
            });
          })
        )
      )
    )
  );

  private formatPreviewUrl(value: any) {
    if (!value?.image && !value?.icon) {
      return `assets/images/no-link-preview.jpg`;
    }
    return value.image?.url ?? value.icon.url;
  }
  constructor(
    private actions$: Actions,
    private pagePreviewService: PagePreviewService
  ) {}
}
