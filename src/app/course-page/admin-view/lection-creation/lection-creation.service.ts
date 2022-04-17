import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subject } from 'rxjs';
import { CreationPreview } from '../../models/creation-preview.model';
import { GeneralInfo, LectionModel } from '../../models/lection.model';

@Injectable({ providedIn: 'root' })
export class LectionCreationService {
  private lectionSubject = new Subject<void>();
  private lection: LectionModel;
  createLection$ = this.lectionSubject.asObservable();

  constructor(private db: AngularFirestore) {}

  onLectionCreationApproval() {
    this.lection = {
      title: '',
      topic: null,
    };
    this.lectionSubject.next();
    setTimeout(() => {
      this.createLection();
    });
  }

  createLection() {
    console.log(this.lection);
  }

  addEditorData(editorData: string) {
    this.lection.editorData = editorData;
  }
  addLinks(links: CreationPreview[]) {
    this.lection.links = links;
  }

  addGeneralInfo(generalInfo: GeneralInfo) {
    Object.entries(generalInfo).forEach(([key, value]) => {
      this.lection[<keyof GeneralInfo>key] = value;
    });
  }
  addFiles(files: CreationPreview[]) {
    this.lection.files = files;
  }

  getTopics(courseId: string) {
    return this.db
      .collection('courses')
      .doc(courseId)
      .collection('topics')
      .get()
      .pipe(
        map((topicSnapshot) =>
          topicSnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data()['name'],
          }))
        )
      );
  }
}
