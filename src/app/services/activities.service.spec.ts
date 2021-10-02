import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';

import { ActivitiesService, BORED_API_BASE } from './activities.service';
import { ActivityType, INITIAL_SEARCH_OPTIONS } from '../utils/activity.const';
import { ActivityRes } from '../utils/activity.types';

describe('ActivitiesService', () => {
    let service: ActivitiesService;
    let httpMock: HttpTestingController;

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
            imports: [HttpClientTestingModule],
            providers: [ActivitiesService],
        });
        service = TestBed.inject(ActivitiesService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('#getActivity', () => {
        it('should fetch activity from BORED API', (done) => {
            service.getActivity(INITIAL_SEARCH_OPTIONS).subscribe((res) => {
                expect(res).toEqual(suggestedActivityMock);
                done();
            });

            const req = httpMock.expectOne(
                BORED_API_BASE +
                    `?participants=${
                        INITIAL_SEARCH_OPTIONS.participants
                    }&accessability=${
                        INITIAL_SEARCH_OPTIONS.accessability / 100
                    }&type=`
            );
            expect(req.request.method).toBe('GET');
            req.flush(suggestedActivityMock);
            httpMock.verify();
        });
    });
});
