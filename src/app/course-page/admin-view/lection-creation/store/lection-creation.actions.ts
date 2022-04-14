import { createAction, props } from '@ngrx/store';
import { CreationPreview } from 'src/app/course-page/models/creation-preview.model';

export namespace LectionCreationActions {
  export const addLink = createAction('Add Link', props<CreationPreview>());
  export const removeItem = createAction(
    'Remove Item',
    props<CreationPreview>()
  );

  export const addFile = createAction('Add File', props<CreationPreview>());
  export const removeFile = createAction(
    'Remove File',
    props<CreationPreview>()
  );
}
