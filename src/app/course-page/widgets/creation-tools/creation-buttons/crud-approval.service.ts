import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudApprovalService {
  private approvalSubject = new Subject<void>();
  approved$ = this.approvalSubject.asObservable();

  constructor() {}
  crudApproved() {
    this.approvalSubject.next();
  }
}
