import { createReducer, on } from '@ngrx/store';
import { CreationPreview } from 'src/app/course-page/models/creation-preview.model';
import { LectionCreationActions } from './lection-creation.actions';

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
  on(LectionCreationActions.addLink, (state, link) => {
    const links: CreationPreview[] = state.links.slice();
    links.unshift(link);
    return {
      ...state,
      links,
    };
  }),
  on(LectionCreationActions.removeLink, (state, linkToRemove) => {
    console.log(linkToRemove);
    return {
      ...state,
      links: state.links.filter((link) => link !== linkToRemove),
    };
  }),
  //#endregion
  //#region FILES
  on(LectionCreationActions.addFile, (state, file) => {
    const files: CreationPreview[] = state.files.slice();
    files.unshift(file);
    return {
      ...state,
      files,
    };
  }),
  on(LectionCreationActions.removeFile, (state, fileToRemove) => {
    console.log(fileToRemove);
    return {
      ...state,
      files: state.files.filter((link) => link !== fileToRemove),
    };
  })
  //#endregion
);
