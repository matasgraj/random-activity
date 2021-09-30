import { ActivityType } from './activity.const';

export interface Activity {
    participants: number;
    accessability: number;
    activityType: ActivityType | string;
}

export interface ActivityRes {
    participants: number;
    accessability: number;
    type: string;
    activity: string;
    price: number;
    link: string;
    key: string;
}
