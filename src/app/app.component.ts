import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SEARCH_PAGE_PATH } from './utils/activity.const';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {
        this.router.navigateByUrl(SEARCH_PAGE_PATH);
    }
}
