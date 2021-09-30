import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { ActivityRes } from '../utils/activity.types';
import { searchActivity, searchActivitySuccess } from './activity.actions';

export const activityAdapter: EntityAdapter<ActivityRes> =
    createEntityAdapter<ActivityRes>({
        selectId: (activity: ActivityRes) => activity.key,
    });

export interface ActivityState extends EntityState<ActivityRes> {
    loaded: boolean;
    loading: boolean;
}

export const initialState: ActivityState = activityAdapter.getInitialState({
    loaded: false,
    loading: false,
});

const reducer: ActionReducer<ActivityState> = createReducer(
    initialState,
    on(searchActivity, () => ({
        ...initialState,
        loading: true,
        loaded: false,
    })),
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
