import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lection } from '../../models/lection.model';

@Injectable({
  providedIn: 'root',
})
export class LectionCreationService {
  lection$ = new BehaviorSubject<Lection | null>(null);

  constructor() {}

  createLection(lection: Lection) {
    this.lection$.next(lection);
  }
}
