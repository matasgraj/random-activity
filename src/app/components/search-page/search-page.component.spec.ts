import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { saveSearchOptions } from 'src/app/store/activity.actions';
import { getSearchOptions } from 'src/app/store/activity.selectors';
import {
    INITIAL_SEARCH_OPTIONS,
    RESULTS_PAGE_PATH,
} from 'src/app/utils/activity.const';

import { SearchPageComponent } from './search-page.component';

describe('SearchPageComponent', () => {
    let component: SearchPageComponent;
    let fixture: ComponentFixture<SearchPageComponent>;
    let storeMock: MockStore;
    let routerMock: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [FormBuilder, provideMockStore()],
            imports: [
                RouterTestingModule,
                MatRadioModule,
                MatSliderModule,
                FormsModule,
                ReactiveFormsModule,
            ],
            declarations: [SearchPageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        storeMock = TestBed.inject(MockStore);
        spyOn(storeMock, 'dispatch');
        storeMock.overrideSelector(getSearchOptions, INITIAL_SEARCH_OPTIONS);

        routerMock = TestBed.inject(Router);
        spyOn(routerMock, 'navigateByUrl');

        fixture = TestBed.createComponent(SearchPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('#ngOnInit', () => {
        it('should initialise activity form', () => {
            component.ngOnInit();
            expect(component.activityForm.value).toEqual(
                INITIAL_SEARCH_OPTIONS
            );
        });
    });

    describe('#searchActivity', () => {
        beforeEach(() => {
            component.ngOnInit();
            component.searchActivity();
        });
        it('should dispatch saveSearchOptions action', () => {
            expect(storeMock.dispatch).toHaveBeenCalledWith(
                saveSearchOptions(INITIAL_SEARCH_OPTIONS)
            );
        });
        it('should route to results page', () => {
            expect(routerMock.navigateByUrl).toHaveBeenCalledWith(
                RESULTS_PAGE_PATH
            );
        });
    });
});
