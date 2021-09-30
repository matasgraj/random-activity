import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ActivitiesService } from '../services/activities.service';
import {
    searchActivity,
    searchActivityFail,
    searchActivitySuccess,
} from './activity.actions';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class ActivityEffects {
    public serachActivity$: Observable<Action> = createEffect((): any =>
        this.actions$.pipe(
            ofType(searchActivity),
            switchMap((action) =>
                this.activitiesService.getActivity(action.payload).pipe(
                    switchMap((activity) =>
                        of(searchActivitySuccess(activity))
                    ),
                    catchError((error) => of(searchActivityFail(error)))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private activitiesService: ActivitiesService
    ) {}
}
