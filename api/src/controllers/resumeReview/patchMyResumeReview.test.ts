import { NextFunction, Request, Response } from 'express';
import { mocked } from 'ts-jest/utils';

import InternalServerErrorException from '../../exceptions/InternalServerErrorException';
import NotAuthorizedException from '../../exceptions/NotAuthorizedException';
import * as resumeReviewRepository from '../../repositories/resumeReviewRepository';
import * as userRepository from '../../repositories/userRepository';
import testConstants from '../../util/testConstants';
import patchMyResumeReview from './patchMyResumeReview';

jest.mock('../../repositories/resumeReviewRepository');
const mockResumeReviewRepository = mocked(resumeReviewRepository, true);

jest.mock('../../repositories/userRepository');
const mockUserRepository = mocked(userRepository, true);

type Params = {
    resumeReview: string;
};

let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;

beforeEach(() => {
    req = {
        body: {
            reviewee: testConstants.user1.id,
            reviewer: testConstants.user1.id,
            state: 'finished',
        },
        params: {
            resumeReview: testConstants.resumeReview1.id,
        },
        user: {
            sub: testConstants.user1.id,
        },
    };
    res = { status: jest.fn().mockReturnThis(), end: jest.fn().mockReturnThis() };
    next = jest.fn();
    mockResumeReviewRepository.get.mockResolvedValue([testConstants.resumeReview1]);
    mockUserRepository.get.mockResolvedValue([testConstants.user1]);
});

afterEach(() => {
    jest.clearAllMocks();
});

it('rejects non-uuid resume review', async () => {
    req.params = { resumeReview: 'lolz' };

    await patchMyResumeReview(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid route parameters', status: 400, details: { resumeReview: 'Must be a UUID' } });
});

it('rejects non-existent resume review', async () => {
    mockResumeReviewRepository.get.mockResolvedValueOnce([]);
    await patchMyResumeReview(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid route parameters', status: 400, details: { resumeReview: 'Must be a resume review that already exists' } });
});

it('rejects invalid state', async () => {
    req.body.state = 'asdf';

    await patchMyResumeReview(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { state: 'Must be one of "canceled", "finished", "reviewing", or "seeking_reviewer"' } });
});

it('works with all fields as null', async () => {
    req.body = {};

    await patchMyResumeReview(req as Request<Params>, res as Response, next);

    expect(res.status).toBeCalledWith(204);
    expect(mockResumeReviewRepository.update).toBeCalled();
});

it('works with just reviewee field', async () => {
    req.body = { reviewee: 'test' };

    await patchMyResumeReview(req as Request<Params>, res as Response, next);

    expect(res.status).toBeCalledWith(204);
    expect(mockResumeReviewRepository.update).toBeCalledWith(testConstants.resumeReview1.id, 'test', undefined, undefined);
});

it('works with just reviewer field', async () => {
    req.body = { reviewer: 'test' };

    await patchMyResumeReview(req as Request<Params>, res as Response, next);

    expect(res.status).toBeCalledWith(204);
    expect(mockResumeReviewRepository.update).toBeCalledWith(testConstants.resumeReview1.id, undefined, 'test', undefined);
});

it('works with just state field', async () => {
    req.body = { state: 'finished' };

    await patchMyResumeReview(req as Request<Params>, res as Response, next);

    expect(res.status).toBeCalledWith(204);
    expect(mockResumeReviewRepository.update).toBeCalledWith(testConstants.resumeReview1.id, undefined, undefined, 'finished');
});

it('works with all fields', async () => {
    await patchMyResumeReview(req as Request<Params>, res as Response, next);

    expect(res.status).toBeCalledWith(204);
    expect(mockResumeReviewRepository.update).toBeCalledWith(testConstants.resumeReview1.id, testConstants.user1.id, testConstants.user1.id, 'finished');
});

it('throws error when update fails', async () => {
    const err = new Error('');
    mockResumeReviewRepository.update.mockRejectedValueOnce(err);

    await patchMyResumeReview(req as Request<Params>, res as Response, next);

    expect(res.status).not.toBeCalled();
    expect(next).toBeCalledWith(new InternalServerErrorException({ issue: 'Failed to update reviewee, reviewer or state. Try again with same data.' }, err));
});

it('throws not authorized when user does not match', async () => {
    // Mock for validation
    mockResumeReviewRepository.get.mockResolvedValueOnce([testConstants.resumeReview1]);
    // Mock to check whether it's overriding another person's claim
    mockResumeReviewRepository.get.mockResolvedValueOnce([testConstants.resumeReview1]);
    // Mocks to check association to user
    mockResumeReviewRepository.get.mockResolvedValueOnce([]).mockResolvedValueOnce([]);

    await patchMyResumeReview(req as Request<Params>, res as Response, next);

    expect(res.status).not.toBeCalled();
    expect(next).toBeCalledWith(new NotAuthorizedException());
});
