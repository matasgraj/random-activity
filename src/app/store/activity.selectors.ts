import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityState } from './activity.reducer';

export const getFullActivityState =
    createFeatureSelector<ActivityState>('activity');

export const getSearchOptions = createSelector(
    getFullActivityState,
    (state) => state.searchOptions
);
