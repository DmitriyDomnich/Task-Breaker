import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap } from 'rxjs';
import { PrivateCoursesService } from '../shared/services/private-courses.service';

@Component({
  selector: 'user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss'],
})
export class UserCoursesComponent implements OnInit {
  constructor(
    private userCoursesService: PrivateCoursesService,
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.auth.user
      .pipe(switchMap((user) => this.userCoursesService.getCourses(user!.uid)))
      .subscribe();
  }
}
