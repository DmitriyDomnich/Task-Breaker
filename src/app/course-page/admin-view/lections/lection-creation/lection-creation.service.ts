import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import {
  from,
  iif,
  map,
  mergeAll,
  mergeMap,
  Observable,
  of,
  skipWhile,
  Subject,
  switchMap,
  tap,
  toArray,
} from 'rxjs';
import { CoursePageService } from 'src/app/course-page/services/course-page.service';
import { CreationPreview } from '../../../models/creation-preview.model';
import {
  GeneralInfo,
  LectionModel,
  Topic,
} from '../../../models/lection.model';
import { CrudApprovalService } from '../../../widgets/creation-tools/creation-buttons/crud-approval.service';

@Injectable({ providedIn: 'root' })
export class LectionCreationService {
  private lectionSubject = new Subject<void>();
  private currentLection: LectionModel;
  private currentTopics: Topic[];
  createLection$ = this.lectionSubject.asObservable();

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router,
    private crudApprovalService: CrudApprovalService,
    private coursePageService: CoursePageService
  ) {}

  onLectionCreationApproval() {
    this.currentLection = {
      title: '',
      topic: null,
    };
    this.lectionSubject.next();
    setTimeout(() => {
      this.createLection();
    });
  }

  addEditorData(editorData: string) {
    this.currentLection.editorData = editorData;
  }
  addLinks(links: CreationPreview[]) {
    this.currentLection.links = links;
  }

  addGeneralInfo(generalInfo: GeneralInfo) {
    Object.entries(generalInfo).forEach(([key, value]) => {
      this.currentLection[<keyof GeneralInfo>key] = value;
    });
  }
  addFiles(files: CreationPreview[]) {
    this.currentLection.files = files;
  }

  getTopics(courseId: string): Observable<Topic[]> {
    console.log(courseId);
    return this.coursePageService
      .getTopics(courseId)
      .pipe(tap((topics) => (this.currentTopics = topics.slice())));
  }

  private createLection() {
    const currentTopic = this.currentLection.topic;

    const courseId = this.router.parseUrl(this.router.url).root.children[
      'primary'
    ].segments[1].path;
    if (
      currentTopic != null &&
      !this.currentTopics.find((topic) => topic.id === currentTopic?.id)
    ) {
      this.createNewTopic(<Topic>currentTopic, courseId);
    }
    const lection: any = {
      title: this.currentLection.title,
      topic: currentTopic?.name ?? null,
      description: this.currentLection.description,
      links: this.currentLection.links || [],
      editorData: this.currentLection.editorData ?? '',
      published: new Date(Date.now()),
    };
    const lectionId = this.db.createId();
    const lectionRef = this.db
      .collection('courses')
      .doc(courseId)
      .collection('lections')
      .doc(lectionId);
    iif(
      () => !!this.currentLection.files?.length,
      this.getFileLinks(
        // if there are files, get them
        courseId,
        lectionId,
        this.currentLection.files!.map((lectionPreview) => lectionPreview.file!)
      ).pipe(
        switchMap((fileLinks) => {
          lection.files = fileLinks;
          return from(lectionRef.set(lection));
        })
      ),
      lectionRef.set(lection)
    ).subscribe((_) => this.crudApprovalService.crudApproved());
  }
  private getFileLinks(courseId: string, lectionId: string, files: File[]) {
    const filesStorageRefs: Array<AngularFireStorageReference> = [];
    return of(
      files.reduce((acc, file) => {
        const fileStorageRef = this.storage.ref(
          `courses/${courseId}/lections/${lectionId}/${file.name}`
        );
        filesStorageRefs.push(fileStorageRef);
        acc.push(fileStorageRef.put(file));
        return acc;
      }, Array<AngularFireUploadTask>())
    ).pipe(
      mergeAll(),
      mergeMap((uploadTask, index) =>
        uploadTask.snapshotChanges().pipe(
          skipWhile((val) => {
            console.log(val?.state === 'running', index);
            return val?.state === 'running';
          })
        )
      ),
      mergeMap((uploadSnapshot) => from(uploadSnapshot!.ref.getDownloadURL())),
      toArray(),
      tap((val) => console.log(val))
    );
  }
  private createNewTopic({ name, id }: Topic, courseId: string) {
    this.db
      .collection('courses')
      .doc(courseId)
      .collection('topics')
      .doc(id)
      .set({
        name: name,
      });
  }
}
