import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Activity, ActivityRes } from '../utils/activity.types';
import { Observable } from 'rxjs';

const BORED_API_BASE = 'http://www.boredapi.com/api/activity?';

@Injectable({
    providedIn: 'root',
})
export class ActivitiesService {
    constructor(private httpClient: HttpClient) {}

    getActivity(activity: Activity): Observable<ActivityRes> {
        return this.httpClient.get<ActivityRes>(
            BORED_API_BASE +
                `participants=${activity.participants}&accessability=${activity.accessability}&type=${activity.activityType}`
        );
    }
}
