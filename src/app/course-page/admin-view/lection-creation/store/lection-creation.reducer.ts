import { createReducer, on } from '@ngrx/store';
import { CreationPreview } from 'src/app/course-page/models/creation-preview.model';
import { LectionCreationActions } from './lection-creation.actions';
import { v4 as createId } from 'uuid';

export interface CreationItemsState {
  files: CreationPreview[];
  links: CreationPreview[];
}

export const creationItemsFeatureKey = 'creation-items';

const initialState: CreationItemsState = {
  files: [],
  links: [],
};

export const creationItemsReducer = createReducer(
  initialState,
  //#region LINKS
  on(LectionCreationActions.addLink, (state, { link }) => {
    console.log(link);
    const links: CreationPreview[] = state.links.slice();
    links.unshift(link);
    return {
      ...state,
      links,
    };
  }),
  on(LectionCreationActions.removeItem, (state, itemToRemove) => {
    const allItems = [...state.files, ...state.links];
    const filteredItems: CreationPreview[] = allItems.filter(
      (item) => item.id !== itemToRemove.id
    );

    return {
      files: filteredItems.filter((item) => item.previewType === 'file'),
      links: filteredItems.filter((item) => item.previewType === 'link'),
    };
  }),
  //#endregion
  //#region FILES
  on(LectionCreationActions.addFile, (state, { file }) => {
    const filePreview: CreationPreview = {
      info: file.type,
      title: file.name,
      previewUrl: 'assets/images/file-image.png',
      previewType: 'file',
      id: createId(),
      file,
    };
    const files: CreationPreview[] = state.files.slice();
    files.unshift(filePreview);
    return {
      ...state,
      files,
    };
  })
  //#endregion
);
