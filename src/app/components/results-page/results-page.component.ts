import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { searchActivity } from 'src/app/store/activity.actions';
import {
    getActivity,
    getErrorState,
    getLoadingState,
} from 'src/app/store/activity.selectors';
import { SEARCH_PAGE_PATH } from 'src/app/utils/activity.const';
import { ActivityRes } from 'src/app/utils/activity.types';

@Component({
    selector: 'app-results-page',
    templateUrl: './results-page.component.html',
    styleUrls: ['./results-page.component.scss'],
})
export class ResultsPageComponent {
    suggestedActivity$: Observable<ActivityRes | undefined>;
    isLoading$: Observable<boolean>;
    isError$: Observable<boolean>;
    constructor(private router: Router, private store: Store) {
        this.suggestedActivity$ = this.store.pipe(select(getActivity));
        this.isLoading$ = this.store.pipe(select(getLoadingState));
        this.isError$ = this.store.pipe(select(getErrorState));
    }

    goBack(): void {
        this.router.navigateByUrl(SEARCH_PAGE_PATH);
    }

    refresh(): void {
        this.store.dispatch(searchActivity());
    }
}
