import { NextFunction, Request, Response } from 'express';
import { mocked } from 'ts-jest/utils';

import * as resumeReviewRepository from '../../repositories/resumeReviewRepository';
import { manyToCamelCase } from '../../util/helper';
import tc from '../../util/testConstants';
import getMyResumeReviews from './getMyResumeReviews';

jest.mock('../../repositories/resumeReviewRepository');
const mockResumeReviewRepository = mocked(resumeReviewRepository, true);

let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;

beforeEach(() => {
    req = { user: { sub: tc.resumeReview1.reviewee_id } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    next = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

it('rejects non-uuid id query parameter', async () => {
    req.query = { id: `not-a-uuid` };

    await getMyResumeReviews(req as Request, res as Response, next);

    expect(mockResumeReviewRepository.get).toBeCalledTimes(0);
    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid query parameters', status: 400, details: { id: 'Must be a UUID' } });
});

it('rejects improperly encoded reviewer query parameter', async () => {
    req.query = { reviewer: `%E0%A4%A` };

    await getMyResumeReviews(req as Request, res as Response, next);

    expect(mockResumeReviewRepository.get).toBeCalledTimes(0);
    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid query parameters', status: 400, details: { reviewer: 'Must be properly encoded with encodeURIComponent' } });
});

it('rejects invalid state query parameter', async () => {
    req.query = { state: 'not-a-valid-state' };

    await getMyResumeReviews(req as Request, res as Response, next);

    expect(mockResumeReviewRepository.get).toBeCalledTimes(0);
    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid query parameters', status: 400, details: { state: 'Must be one of "canceled", "finished", "reviewing", or "seeking_reviewer"' } });
});

it('works on the happy path where reviewee matches', async () => {
    req.query = { state: 'seeking_reviewer', reviewer: '52c2cbdc-e0a8-48e7-9302-92a37e016ab0' };
    mockResumeReviewRepository.get.mockResolvedValueOnce([tc.resumeReview1]);

    await getMyResumeReviews(req as Request, res as Response, next);

    expect(mockResumeReviewRepository.get).toBeCalledWith(undefined, tc.resumeReview1.reviewee_id, '52c2cbdc-e0a8-48e7-9302-92a37e016ab0', 'seeking_reviewer');
    expect(next).not.toBeCalled();
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ resumeReviews: manyToCamelCase([tc.resumeReview1]) });
});
