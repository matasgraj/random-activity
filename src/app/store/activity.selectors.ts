import { createFeatureSelector, createSelector } from '@ngrx/store';
import { activityAdapter, ActivityState } from './activity.reducer';

export const getFullActivityState =
    createFeatureSelector<ActivityState>('activity');

export const { selectEntities: getEntities } =
    activityAdapter.getSelectors(getFullActivityState);

export const getSearchOptions = createSelector(
    getFullActivityState,
    (state) => state.searchOptions
);

export const getActivity = createSelector(
    getEntities,
    (entities) => Object.keys(entities).map((key) => entities[key])[0]
);

export const getLoadingState = createSelector(
    getFullActivityState,
    (state) => state.loading
);

export const getErrorState = createSelector(
    getFullActivityState,
    (state) => state.error
);

export const getActivitySearchOptions = createSelector(
    getFullActivityState,
    (state) => state.searchOptions
);
