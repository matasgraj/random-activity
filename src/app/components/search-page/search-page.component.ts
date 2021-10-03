import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { saveSearchOptions } from 'src/app/store/activity.actions';
import { getSearchOptions } from 'src/app/store/activity.selectors';
import {
    MAX_PARTICIPANTS,
    MIN_PARTICIPANTS,
    ActivityType,
    RESULTS_PAGE_PATH,
    INITIAL_SEARCH_OPTIONS,
    ANY_ACTIVITY,
} from 'src/app/utils/activity.const';
import { Activity } from 'src/app/utils/activity.types';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
    minParticipants = MIN_PARTICIPANTS;
    maxParticipants = MAX_PARTICIPANTS;
    activityList = ActivityType;
    activityTypeAny = ANY_ACTIVITY;

    activityForm: FormGroup;

    activityOptions: Activity = INITIAL_SEARCH_OPTIONS;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store,
        private router: Router
    ) {
        this.activityForm = this.createForm();
        this.store
            .pipe(select(getSearchOptions), take(1))
            .subscribe((options) => (this.activityOptions = options));
    }

    ngOnInit(): void {
        this.activityForm = this.createForm();
    }

    private createForm(): FormGroup {
        return this.formBuilder.group({
            participants: new FormControl(this.activityOptions.participants, [
                Validators.required,
                Validators.min(this.minParticipants),
                Validators.max(this.maxParticipants),
            ]),
            accessability: new FormControl(this.activityOptions.accessability, [
                Validators.required,
                Validators.min(1),
                Validators.max(100),
            ]),
            activityType: new FormControl(this.activityOptions.activityType),
        });
    }

    searchActivity(): void {
        this.store.dispatch(saveSearchOptions(this.activityForm.value));
        this.router.navigateByUrl(RESULTS_PAGE_PATH);
    }
}
