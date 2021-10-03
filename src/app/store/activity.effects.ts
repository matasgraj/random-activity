import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ActivitiesService } from '../services/activities.service';
import {
    saveSearchOptions,
    searchActivity,
    searchActivityFail,
    searchActivitySuccess,
} from './activity.actions';
import { switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { getSearchOptions } from './activity.selectors';
import { ActivityRes } from '../utils/activity.types';

@Injectable()
export class ActivityEffects {
    public saveSearchOptions$: Observable<Action> = createEffect((): any =>
        this.actions$.pipe(
            ofType(saveSearchOptions),
            switchMap(() => of(searchActivity()))
        )
    );

    public searchActivity$: Observable<Action> = createEffect((): any =>
        this.actions$.pipe(
            ofType(searchActivity),
            withLatestFrom(this.store.pipe(select(getSearchOptions))),
            switchMap(([_, searchOptions]) =>
                this.activitiesService.getActivity(searchOptions).pipe(
                    switchMap((activity) =>
                        this.isActivityFetched(activity)
                            ? of(searchActivityFail())
                            : of(searchActivitySuccess(activity))
                    ),
                    catchError(() => of(searchActivityFail()))
                )
            )
        )
    );

    private isActivityFetched(activity: ActivityRes): boolean {
        return !!(activity as any).error;
    }

    constructor(
        private actions$: Actions,
        private activitiesService: ActivitiesService,
        private store: Store
    ) {}
}
