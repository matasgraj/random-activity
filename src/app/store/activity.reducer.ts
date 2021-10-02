import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { Activity, ActivityRes } from '../utils/activity.types';
import {
    saveSearchOptions,
    searchActivity,
    searchActivitySuccess,
} from './activity.actions';

export const activityAdapter: EntityAdapter<ActivityRes> =
    createEntityAdapter<ActivityRes>({
        selectId: (activity: ActivityRes) => activity.key,
    });

export interface ActivityState extends EntityState<ActivityRes> {
    loaded: boolean;
    loading: boolean;
    searchOptions: Activity;
}

export const initialState: ActivityState = activityAdapter.getInitialState({
    loaded: false,
    loading: false,
    searchOptions: {
        accessability: 0,
        participants: 1,
        activityType: '',
    },
});

const reducer: ActionReducer<ActivityState> = createReducer(
    initialState,
    on(saveSearchOptions, (state, action) => ({
        ...initialState,
        searchOptions: action.payload,
    })),
    on(searchActivity, (state) =>
        activityAdapter.removeAll({
            ...state,
            loading: true,
            loaded: false,
        })
    ),
    on(searchActivitySuccess, (state, action) =>
        activityAdapter.addOne(action.payload, {
            ...state,
            loading: false,
            loaded: true,
        })
    )
);

export function ActivityReducer(
    state: ActivityState,
    action: Action
): ActivityState {
    return reducer(state, action);
}
