import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { filter, first, take, tap } from 'rxjs';
import {
  selectAllSpheres,
  selectPublicFilteredCourses,
} from 'src/app/store/courses.selectors';
import { PublicCourse } from '../shared/models/course.model';
import { AppState } from '../store/models/app.state';
import { CoursesCollection } from '../store/models/courses-collection.model';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$ = this.store.select(selectPublicFilteredCourses);

  @Input() isPublic: boolean;
  constructor(
    private store: Store<AppState>,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectAllSpheres)
      .pipe(
        filter((val) => !!val.length),
        take(1),
        tap((spheres) => {
          spheres.forEach((sphere) => {
            this.iconRegistry.addSvgIcon(
              sphere.name,
              this.sanitizer.bypassSecurityTrustResourceUrl(sphere.iconURL)
            );
          });
        })
      )
      .subscribe();
  }
  getCoursesFromCollection(
    coursesCollections: CoursesCollection<PublicCourse>[]
  ): Array<any> {
    return coursesCollections
      .map((courseCollection) => courseCollection.courses)
      .flat();
  }
}
