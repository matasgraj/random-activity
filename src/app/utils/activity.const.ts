import { Activity } from './activity.types';

export enum ActivityType {
    Educational = 'education',
    Recreational = 'recreational',
    Social = 'social',
    Diy = 'diy',
    Charity = 'charity',
    Cooking = 'cooking',
    Relaxation = 'relaxation',
    Music = 'music',
    Busywork = 'busywork',
}

export const ANY_ACTIVITY = 'any';

export const MIN_PARTICIPANTS = 1;
export const MAX_PARTICIPANTS = 10;

export const SEARCH_PAGE_PATH = 'search-activity';
export const RESULTS_PAGE_PATH = 'results';

export const INITIAL_SEARCH_OPTIONS: Activity = {
    accessability: 1,
    participants: 1,
    activityType: ANY_ACTIVITY,
};
