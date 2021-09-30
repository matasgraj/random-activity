import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../utils/activity.types';

const BORED_API_BASE = 'http://www.boredapi.com/api/activity?';

@Injectable({
    providedIn: 'root',
})
export class ActivitiesService {
    constructor(private httpClient: HttpClient) {}

    getActivity(activity: Activity) {
        console.log(activity);
        this.httpClient
            .get(
                BORED_API_BASE +
                    `participants=${activity.participants}&accessability=${activity.accessability}&type=${activity.activityType}`
            )
            .subscribe((v) => console.log(v));
        return [];
    }
}
