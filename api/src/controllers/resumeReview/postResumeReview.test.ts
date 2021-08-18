import { NextFunction, Request, Response } from 'express';
import { mocked } from 'ts-jest/utils';

import * as resumeReviewRepository from '../../repositories/resumeReviewRepository';
import * as userRepository from '../../repositories/userRepository';
import tc from '../../util/testConstants';
import postResumeReview from './postResumeReview';

jest.mock('../../repositories/resumeReviewRepository');
const mockResumeReviewRepository = mocked(resumeReviewRepository, true);
jest.mock('../../repositories/userRepository');
const mockUserRepository = mocked(userRepository, true);

let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;

beforeEach(() => {
    req = {};
    res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    next = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

it('rejects improperly encoded reviewee for reviewee', async () => {
    req.body = { reviewee: '%E0%A4%A' };

    await postResumeReview(req as Request, res as Response, next);

    expect(mockResumeReviewRepository.create).toBeCalledTimes(0);
    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { reviewee: 'Must be properly encoded with encodeURIComponent' } });
});

it('rejects user not in db', async () => {
    req.body = { reviewee: 'user' };
    mockUserRepository.get.mockResolvedValueOnce([]);

    await postResumeReview(req as Request, res as Response, next);

    expect(mockResumeReviewRepository.create).toBeCalledTimes(0);
    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { reviewee: 'Must be a user that already exists' } });
});

it('works on happy path', async () => {
    req.body = { reviewee: '67e8ff47-8c31-4725-885c-e0e40455e7f5' };
    mockResumeReviewRepository.create.mockResolvedValueOnce(tc.resumeReview1);
    mockUserRepository.get.mockResolvedValueOnce([tc.user1]);

    await postResumeReview(req as Request, res as Response, next);

    expect(mockResumeReviewRepository.create).toBeCalledWith('67e8ff47-8c31-4725-885c-e0e40455e7f5', 'seeking_reviewer');
    expect(next).not.toBeCalled();
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith({ resumeReview: tc.resumeReview1 });
});
