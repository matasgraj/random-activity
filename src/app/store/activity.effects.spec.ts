import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { ActivitiesService } from '../services/activities.service';
import { ActivityEffects } from './activity.effects';
import { ActivityReducer } from './activity.reducer';
import { cold } from 'jasmine-marbles';
import {
    saveSearchOptions,
    searchActivity,
    searchActivityFail,
    searchActivitySuccess,
} from './activity.actions';
import { ActivityType, INITIAL_SEARCH_OPTIONS } from '../utils/activity.const';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getSearchOptions } from './activity.selectors';
import { Activity, ActivityRes } from '../utils/activity.types';

describe('Activity Effects', () => {
    let actions$: Observable<Actions>;
    let effects: ActivityEffects;
    let service: ActivitiesService;
    let store: MockStore;
    let serviceSpy: jasmine.Spy<
        (activity: Activity) => Observable<ActivityRes>
    >;

    const suggestedActivityMock: ActivityRes = {
        type: ActivityType.Busywork,
        activity: 'activity',
        participants: 1,
        accessability: 1,
        price: 1,
        link: '',
        key: '123',
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                StoreModule.forRoot({}),
                StoreModule.forFeature('activity', ActivityReducer),
            ],
            providers: [
                ActivityEffects,
                provideMockStore(),
                provideMockActions(() => actions$),
                ActivitiesService,
            ],
        });

        store = TestBed.inject(MockStore);
        store.overrideSelector(getSearchOptions, INITIAL_SEARCH_OPTIONS);
        effects = TestBed.inject(ActivityEffects);
        service = TestBed.inject(ActivitiesService);
        serviceSpy = spyOn(service, 'getActivity');
    });

    describe('#saveSearchOptions$', () => {
        it('should dispatch searchActivity action', () => {
            actions$ = cold('-a', {
                a: saveSearchOptions(INITIAL_SEARCH_OPTIONS),
            });
            expect(effects.saveSearchOptions$).toBeObservable(
                cold('-b', { b: searchActivity() })
            );
        });
    });

    describe('#searchActivity$', () => {
        it('should dispatch searchActivitySuccess action', () => {
            serviceSpy.calls.reset();
            serviceSpy.and.returnValue(of(suggestedActivityMock));
            actions$ = cold('-a-', {
                a: searchActivity(),
            });
            expect(effects.searchActivity$).toBeObservable(
                cold('-b', { b: searchActivitySuccess(suggestedActivityMock) })
            );
        });
        it('should dispatch searchActivityFail action', () => {
            const errorMock = { error: 'No activities found' };
            serviceSpy.calls.reset();
            serviceSpy.and.returnValue(of(errorMock as any));
            actions$ = cold('-a-', {
                a: searchActivity(),
            });
            expect(effects.searchActivity$).toBeObservable(
                cold('-b', {
                    b: searchActivityFail(errorMock),
                })
            );
        });
    });
});
