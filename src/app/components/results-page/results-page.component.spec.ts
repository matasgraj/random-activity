import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { searchActivity } from 'src/app/store/activity.actions';
import { SEARCH_PAGE_PATH } from 'src/app/utils/activity.const';

import { ResultsPageComponent } from './results-page.component';

describe('ResultsPageComponent', () => {
    let component: ResultsPageComponent;
    let fixture: ComponentFixture<ResultsPageComponent>;
    let routerMock: Router;
    let storeMock: MockStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [provideMockStore()],
            imports: [RouterTestingModule],
            declarations: [ResultsPageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ResultsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        routerMock = TestBed.inject(Router);
        spyOn(routerMock, 'navigateByUrl');

        storeMock = TestBed.inject(MockStore);
        spyOn(storeMock, 'dispatch');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('#goBack', () => {
        it('should route to search page', () => {
            component.goBack();
            expect(routerMock.navigateByUrl).toHaveBeenCalledWith(
                SEARCH_PAGE_PATH
            );
        });
    });

    describe('#refresh', () => {
        it('should dispatch searchActivity action', () => {
            component.refresh();
            expect(storeMock.dispatch).toHaveBeenCalledWith(searchActivity());
        });
    });
});
