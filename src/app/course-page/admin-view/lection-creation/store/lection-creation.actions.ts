import { createAction, props } from '@ngrx/store';
import { CreationPreview } from 'src/app/course-page/models/creation-preview.model';

export interface FileInObject {
  file: File;
}

export namespace LectionCreationActions {
  export const getPreview = createAction(
    'Get Preview',
    props<{ url: string }>()
  );
  export const addLink = createAction(
    'Add Link',
    props<{ link: CreationPreview }>()
  );
  export const removeItem = createAction(
    'Remove Item',
    props<CreationPreview>()
  );

  export const addFile = createAction('Add File', props<FileInObject>());
  export const removeFile = createAction(
    'Remove File',
    props<CreationPreview>()
  );
}
