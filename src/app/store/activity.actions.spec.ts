import { ActivityType, INITIAL_SEARCH_OPTIONS } from '../utils/activity.const';
import { ActivityRes } from '../utils/activity.types';
import {
    saveSearchOptions,
    searchActivity,
    searchActivityFail,
    searchActivitySuccess,
} from './activity.actions';

describe('Activity Actions', () => {
    it('should create saveSearchOptions action', () => {
        expect(saveSearchOptions(INITIAL_SEARCH_OPTIONS)).toEqual({
            type: 'Save search options',
            payload: INITIAL_SEARCH_OPTIONS,
        });
    });
    it('should create searchActivity action', () => {
        expect(searchActivity()).toEqual({
            type: 'Search activity',
        });
    });
    it('should create searchActivitySuccess action', () => {
        const suggestedActivityMock: ActivityRes = {
            type: ActivityType.Busywork,
            activity: 'activity',
            participants: 1,
            accessability: 1,
            price: 1,
            link: '',
            key: '123',
        };
        expect(searchActivitySuccess(suggestedActivityMock)).toEqual({
            type: 'Search activity SUCCESS',
            payload: suggestedActivityMock,
        });
    });
    it('should create searchActivityFail action', () => {
        expect(searchActivityFail()).toEqual({
            type: 'Search activity FAILED',
        });
    });
});
