import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
})
export class AdminViewComponent implements OnInit {
  constructor(public router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void {}

  onLectionButtonClick() {}
}
