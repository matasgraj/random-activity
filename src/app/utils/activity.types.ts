import { ActivityType } from './activity.const';

export interface Activity {
    participants: number;
    accessability: number;
    activityType: ActivityType | string;
}
