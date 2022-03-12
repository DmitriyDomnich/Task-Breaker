import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import faker from '@faker-js/faker';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  public cat: string;

  constructor(public afs: AngularFireAuth) {
    this.cat = faker.animal.cat();
  }

  
  
}
