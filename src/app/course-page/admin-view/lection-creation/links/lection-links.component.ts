import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  catchError,
  combineLatestWith,
  EMPTY,
  filter,
  finalize,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { PagePreviewService } from '../../page-preview.service';

@Component({
  selector: 'lection-links',
  templateUrl: './lection-links.component.html',
  styleUrls: ['./lection-links.component.scss'],
})
export class LectionLinksComponent implements OnInit {
  pagePreviews$: Observable<any[]> = of([]);
  @ViewChild('scroll') scrollRef: ElementRef<HTMLSpanElement>;
  linkInput: string = '';
  linkRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  onSubmit(ev: SubmitEvent) {
    ev.preventDefault();

    const linkInput = this.linkInput;
    this.linkInput = '';

    this.pagePreviewService
      .checkEndpoint(linkInput)
      .pipe(
        filter((bool) => {
          if (bool) {
            return true;
          }
          throw new Error("Can't get preview.");
        }),
        catchError((err) =>
          this.pagePreviews$.pipe(
            tap((arr) =>
              arr.push({
                url: linkInput,
                image: {
                  url: 'assets/images/no-link-preview.jpg',
                },
              })
            ),
            map((_) => false)
          )
        ),
        switchMap((res) =>
          !res
            ? EMPTY
            : this.pagePreviewService
                .getPagePreviewJSON(linkInput)
                .pipe(combineLatestWith(this.pagePreviews$))
        ),
        tap(([json, arr]) => {
          arr.push(json);
        }),
        finalize(() =>
          this.scrollRef.nativeElement.scrollIntoView({
            behavior: 'smooth',
          })
        )
      )
      .subscribe({ error: (err) => console.error(err) });
  }

  constructor(private pagePreviewService: PagePreviewService) {}

  ngOnInit(): void {}
}
