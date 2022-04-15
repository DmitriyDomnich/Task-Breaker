import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocViewerService {
  private docSet = new Subject<Uint8Array | null>();
  public docSet$ = this.docSet.asObservable();

  constructor() {}
  setDoc(docBlob: Uint8Array | null) {
    console.log(docBlob);
    this.docSet.next(docBlob);
  }
}
