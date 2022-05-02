import { createReducer, on } from '@ngrx/store';
import { GeneralInfo, Topic } from '../../models/lection.model';
import { LoadingLection } from '../lections/admin-lections.component';
import { AdminViewActions } from './admin-view.actions';

export interface AdminViewState {
  lections: ReadonlyArray<LoadingLection>;
  topics: ReadonlyArray<Topic>;
  assignments: ReadonlyArray<any>;
  topicToFilter: null | string;
}

const initialState: AdminViewState = {
  lections: [],
  topics: [],
  topicToFilter: null,
  assignments: [],
};

export const adminViewReducer = createReducer(
  initialState,
  on(AdminViewActions.getAllLectionsSuccess, (state, { lections }) => ({
    ...state,
    lections,
  })),
  on(AdminViewActions.getTopicsSuccess, (state, { topics }) => ({
    ...state,
    topics,
  })),
  on(AdminViewActions.addLection, (state, lection) => ({
    ...state,
    lections: state.lections.concat(lection),
  })),
  on(AdminViewActions.deleteLectionById, (state, { id }) => {
    const elIndex = state.lections.findIndex((lection) => lection.id === id)!;
    const el = { ...state.lections.find((lection) => lection.id === id)! };
    el.isLoading = true;
    const resultLections: LoadingLection[] = state.lections.slice();
    resultLections.splice(elIndex, 1, el);
    return {
      ...state,
      lections: resultLections,
    };
  }),
  on(AdminViewActions.deleteLectionByIdSuccess, (state, { id }) => ({
    ...state,
    lections: state.lections.filter((lection) => lection.id !== id),
  })),
  on(AdminViewActions.changeTopicToFilter, (state, { topicToFilter }) => ({
    ...state,
    topicToFilter,
  }))
);
