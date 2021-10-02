import { Action } from '@ngrx/store';
import { ActivityType, INITIAL_SEARCH_OPTIONS } from '../utils/activity.const';
import { ActivityRes } from '../utils/activity.types';
import {
    saveSearchOptions,
    searchActivity,
    searchActivityFail,
    searchActivitySuccess,
} from './activity.actions';
import {
    ActivityReducer,
    ActivityState,
    initialState,
} from './activity.reducer';

describe('Activity Reducer', () => {
    const suggestedActivityMock: ActivityRes = {
        type: ActivityType.Busywork,
        activity: 'activity',
        participants: 1,
        accessability: 1,
        price: 1,
        link: '',
        key: '123',
    };

    describe('unkown action', () => {
        it('should return initial state', () => {
            const action: Action = {} as Action;
            const state: ActivityState = ActivityReducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });
    describe('saveSearchOptions action', () => {
        it('should save search options', () => {
            const action: Action = saveSearchOptions(INITIAL_SEARCH_OPTIONS);
            const state: ActivityState = ActivityReducer(initialState, action);

            expect(state).toEqual({
                ...initialState,
                searchOptions: INITIAL_SEARCH_OPTIONS,
            });
        });
    });
    describe('searchActivity action', () => {
        it('should change loading and loaded state and delete all entities', () => {
            const stateMock: ActivityState = {
                ...initialState,
                ids: ['123'],
                entities: { suggestedActivityMock },
            };
            const action: Action = searchActivity();
            const state: ActivityState = ActivityReducer(stateMock, action);

            expect(state).toEqual({
                ...initialState,
                loading: true,
                loaded: false,
                ids: [],
                entities: {},
            });
        });
    });
    describe('searchActivitySuccess action', () => {
        it('should add activity to store', () => {
            const action: Action = searchActivitySuccess(suggestedActivityMock);
            const state: ActivityState = ActivityReducer(initialState, action);

            expect(state).toEqual({
                ...initialState,
                loading: false,
                loaded: true,
                ids: ['123'],
                entities: { '123': suggestedActivityMock },
            });
        });
    });
    describe('searchActivityFail action', () => {
        it('should set error state', () => {
            const action: Action = searchActivityFail({ error: 'error' });
            const state: ActivityState = ActivityReducer(initialState, action);

            expect(state).toEqual({
                ...initialState,
                loading: false,
                loaded: true,
                error: true,
            });
        });
    });
});
