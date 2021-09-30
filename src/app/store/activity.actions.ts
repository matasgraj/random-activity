import { createAction } from '@ngrx/store';
import { Activity } from '../utils/activity.types';

export const searchActivity = createAction(
    'Search activity',
    (payload: Activity) => ({ payload })
);
export const searchActivitySuccess = createAction(
    'Search activity SUCCESS',
    (payload: any) => ({ payload })
);
export const searchActivityFail = createAction(
    'Search activity FAILED',
    (error: any) => ({ error })
);
