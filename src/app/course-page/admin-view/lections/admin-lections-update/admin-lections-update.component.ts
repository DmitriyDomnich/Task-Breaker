import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import { GeneralInfo } from 'src/app/course-page/models/lection.model';
import { AdminViewActions } from '../../store/admin-view.actions';
import { AdminViewState } from '../../store/admin-view.reducer';
import { selectLectionById } from '../../store/admin-view.selectors';

@Component({
  selector: 'admin-lections-update',
  templateUrl: './admin-lections-update.component.html',
  styleUrls: ['./admin-lections-update.component.scss'],
})
export class AdminLectionsUpdateComponent implements OnInit {
  lection$: Observable<GeneralInfo>;
  constructor(
    private store: Store<AdminViewState>,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.lection$ = this.route.queryParamMap.pipe(
      switchMap((queryParam) =>
        this.store.select(selectLectionById(queryParam.get('lectionId')!))
      )
    );
  }
}
