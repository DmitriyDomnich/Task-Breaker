import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  creationItemsFeatureKey,
  CreationItemsState,
} from './lection-creation.reducer';

const selectCreationItems = createFeatureSelector<CreationItemsState>(
  creationItemsFeatureKey
);

export const selectFiles = createSelector(selectCreationItems, ({ files }) => {
  return files;
});
export const selectLinks = createSelector(selectCreationItems, ({ links }) => {
  return links;
});

export const selectAllCreationItems = createSelector(
  selectCreationItems,
  ({ files, links }) => {
    return files.concat(links);
  }
);
