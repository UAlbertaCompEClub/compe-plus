import { NextFunction, Request, Response } from 'express';
import { mocked } from 'ts-jest/utils';
import type * as s from 'zapatos/schema';

import * as resumeReviewRepository from '../../repositories/resumeReviewRepository';
import getResumeReviews from './getResumeReviews';

jest.mock('../../repositories/resumeReviewRepository');
const mockResumeReviewRepository = mocked(resumeReviewRepository, true);

let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;

beforeEach(() => {
    req = {};
    res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    next = jest.fn();
});

it('rejects invalid reviewer query parameter', async () => {
    req.query = { reviewer: 'not-a-uuid' };

    await getResumeReviews(req as Request, res as Response, next);

    expect(mockResumeReviewRepository.get).toBeCalledTimes(0);
    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid query parameters', status: 400, details: { reviewer: 'Must be a UUID' } });
});

it('rejects invalid revieweee query parameter', async () => {
    req.query = { reviewee: 'not-a-uuid' };

    await getResumeReviews(req as Request, res as Response, next);

    expect(mockResumeReviewRepository.get).toBeCalledTimes(0);
    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid query parameters', status: 400, details: { reviewee: 'Must be a UUID' } });
});

it('rejects invalid state query parameter', async () => {
    req.query = { state: 'not-a-valid-state' };

    await getResumeReviews(req as Request, res as Response, next);

    expect(mockResumeReviewRepository.get).toBeCalledTimes(0);
    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid query parameters', status: 400, details: { state: 'Must be a "canceled", "finished", "reviewing", or "seeking_reviewer"' } });
});

it('works on the happy path', async () => {
    req.query = { state: 'seeking_reviewer', reviewer: '52c2cbdc-e0a8-48e7-9302-92a37e016ab0' };
    const d: s.resume_reviews.JSONSelectable[] = [
        {
            id: '52c2cbdc-e0a8-48e7-9302-92a37e016ab0',
            state: 'seeking_reviewer',
            created_at: '2021-06-07T04:51:55.717971+00:00',
            updated_at: '2021-06-07T04:51:55.717971+00:00',
            reviewee_id: '319ffe68-cac5-470f-9186-33371300c38f',
            reviewer_id: '97cf8fdc-884d-442a-ac71-9922b8f1ee5e',
        },
    ];
    mockResumeReviewRepository.get.mockResolvedValueOnce(d);

    await getResumeReviews(req as Request, res as Response, next);

    expect(mockResumeReviewRepository.get).toBeCalledWith(undefined, '52c2cbdc-e0a8-48e7-9302-92a37e016ab0', 'seeking_reviewer');
    expect(next).not.toBeCalled();
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ resumeReviews: d });
});
