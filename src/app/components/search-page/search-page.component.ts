import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { searchActivity } from 'src/app/store/activity.actions';
import {
    MAX_PARTICIPANTS,
    MIN_PARTICIPANTS,
    ACTIVITY_LIST,
    ActivityType,
    RESULTS_PAGE_PATH,
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
    activityList = ACTIVITY_LIST;
    activityType = ActivityType;

    activityForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store,
        private router: Router
    ) {
        this.activityForm = this.createForm();
    }

    ngOnInit(): void {
        this.activityForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.formBuilder.group({
            participants: new FormControl(1, [
                Validators.required,
                Validators.min(this.minParticipants),
                Validators.max(this.maxParticipants),
            ]),
            accessability: new FormControl(1, [
                Validators.required,
                Validators.min(1),
                Validators.max(100),
            ]),
            activityType: new FormControl(this.activityType.Any),
        });
    }

    searchActivity(): void {
        const activity: Activity = this.activityForm.value;
        this.store.dispatch(
            searchActivity({
                ...activity,
                accessability: activity.accessability / 100,
                activityType:
                    activity.activityType === ActivityType.Any
                        ? ''
                        : activity.activityType,
            })
        );
        this.router.navigateByUrl(RESULTS_PAGE_PATH);
    }
}
