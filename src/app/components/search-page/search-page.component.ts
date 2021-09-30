import { Component, OnInit } from '@angular/core';
import {
    MAX_PARTICIPANTS,
    MIN_PARTICIPANTS,
    ACTIVITY_LIST,
} from 'src/app/utils/activity.const';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
    minParticipants = MIN_PARTICIPANTS;
    maxParticipants = MAX_PARTICIPANTS;
    activityList = ACTIVITY_LIST;

    constructor() {}

    ngOnInit(): void {}
}
