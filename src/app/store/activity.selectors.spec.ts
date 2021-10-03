import { ActivityType, INITIAL_SEARCH_OPTIONS } from '../utils/activity.const';
import { ActivityRes } from '../utils/activity.types';
import { ActivityState } from './activity.reducer';
import {
    getActivity,
    getEntities,
    getErrorState,
    getFullActivityState,
    getLoadingState,
    getSearchOptions,
} from './activity.selectors';

describe('Activity Selector', () => {
    let state: { activity: ActivityState };

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
        state = {
            activity: {
                ids: ['123'],
                entities: { '123': suggestedActivityMock },
                loading: false,
                error: false,
                searchOptions: INITIAL_SEARCH_OPTIONS,
            },
        };
    });

    describe('#getFullActivityState', () => {
        it('should return full state', () => {
            expect(getFullActivityState(state)).toEqual(state.activity);
        });
    });
    describe('#getEntities', () => {
        it('should return entities', () => {
            expect(getEntities(state)).toEqual(state.activity.entities);
        });
    });
    describe('#getSearchOptions', () => {
        it('should return search options', () => {
            expect(getSearchOptions(state)).toEqual(
                state.activity.searchOptions
            );
        });
    });
    describe('#getActivity', () => {
        it('should return suggested activity', () => {
            expect(getActivity(state)).toEqual(suggestedActivityMock);
        });
    });
    describe('#getLoadingState', () => {
        it('should return loading state', () => {
            expect(getLoadingState(state)).toEqual(state.activity.loading);
        });
    });
    describe('#getErrorState', () => {
        it('should return error state', () => {
            expect(getErrorState(state)).toEqual(state.activity.error);
        });
    });
});
