import { createAction } from '@ngrx/store';
import { Activity, ActivityRes } from '../utils/activity.types';

export const saveSearchOptions = createAction(
    'Save search options',
    (payload: Activity) => ({ payload })
);

export const searchActivity = createAction('Search activity');
export const searchActivitySuccess = createAction(
    'Search activity SUCCESS',
    (payload: ActivityRes) => ({ payload })
);
export const searchActivityFail = createAction(
    'Search activity FAILED',
    (error: any) => ({ error })
);
