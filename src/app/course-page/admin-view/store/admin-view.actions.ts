import { createAction, props } from '@ngrx/store';
import { GeneralInfo, Topic } from 'src/app/course-page/models/lection.model';
import { LoadingLection } from '../lections/admin-lections.component';

export namespace AdminViewActions {
  export const getAllLections = createAction(
    'Get All Actions',
    props<{ id: string }>()
  );
  export const getAllLectionsSuccess = createAction(
    'Get All Lections Success',
    props<{ lections: ReadonlyArray<LoadingLection> }>()
  );
  export const addLection = createAction(
    'Add Lection',
    props<LoadingLection>()
  );

  export const getTopics = createAction('Get Topics', props<{ id: string }>());
  export const getTopicsSuccess = createAction(
    'Get Topics Success',
    props<{ topics: ReadonlyArray<Topic> }>()
  );

  export const changeTopicToFilter = createAction(
    'Change Topic To Filter',
    props<{ topicToFilter: string | null }>()
  );

  export const updateLection = createAction(
    'Update Lection',
    props<GeneralInfo>()
  );
  export const deleteLectionById = createAction(
    'Delete Lection By Id',
    props<{ id: string }>()
  );
  export const deleteLectionByIdSuccess = createAction(
    'Delete Lection By Id Success',
    props<{ id: string }>()
  );
}
