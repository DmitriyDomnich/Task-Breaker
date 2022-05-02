import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminViewState } from './admin-view.reducer';

export const adminViewFeatureKey = 'admin-view';

const selectAdminView =
  createFeatureSelector<AdminViewState>(adminViewFeatureKey);

export const selectLectionById = (id: string) =>
  createSelector(
    selectAdminView,
    (state) => state.lections.find((lection) => lection.id === id)!
  );

export const selectLections = createSelector(selectAdminView, (state) =>
  state.topicToFilter
    ? state.lections.filter(
        (lection) => <any>lection.topic === state.topicToFilter
      )
    : state.lections
);

export const selectTopics = createSelector(
  selectAdminView,
  (state) => state.topics
);

export const selectAssignments = createSelector(
  selectAdminView,
  (state) => state.assignments
);
