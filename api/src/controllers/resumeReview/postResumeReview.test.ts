import { NextFunction, Request, Response } from 'express';
import { mocked } from 'ts-jest/utils';
import type * as s from 'zapatos/schema';

import * as resumeReviewRepository from '../../repositories/resumeReviewRepository';
import * as userRepository from '../../repositories/userRepository';
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

it('rejects invalid uuid for reviewee', async () => {
    req.body = { reviewee: 'not-a-uuid' };

    await postResumeReview(req as Request, res as Response, next);

    expect(mockResumeReviewRepository.create).toBeCalledTimes(0);
    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { reviewee: 'Must be a UUID' } });
});

it('rejects user not in db', async () => {
    req.body = { reviewee: '097ac529-c94a-4184-bd49-7ce37b42440f' };
    mockUserRepository.get.mockResolvedValueOnce([]);

    await postResumeReview(req as Request, res as Response, next);

    expect(mockResumeReviewRepository.create).toBeCalledTimes(0);
    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { reviewee: 'Must be a user that already exists' } });
});

it('works on happy path', async () => {
    const r: s.resume_reviews.JSONSelectable = {
        id: '52c2cbdc-e0a8-48e7-9302-92a37e016ab0',
        state: 'seeking_reviewer',
        created_at: '2021-06-07T04:51:55.717971+00:00',
        updated_at: '2021-06-07T04:51:55.717971+00:00',
        reviewee_id: '319ffe68-cac5-470f-9186-33371300c38f',
        reviewer_id: '97cf8fdc-884d-442a-ac71-9922b8f1ee5e',
    };
    const u: s.users.JSONSelectable = {
        id: '67e8ff47-8c31-4725-885c-e0e40455e7f5',
        email: 'email@domain.com',
        ccid: 'myccid',
        program: 'compe',
        year: 4,
        given_name: 'bob',
        family_name: 'saggit',
        full_name: 'bob saggit',
        photo_url: 'asdf.com',
        created_at: '2021-06-14T06:09:19.373404+00:00',
        updated_at: '2021-06-14T06:09:19.373404+00:00',
    };
    req.body = { reviewee: '67e8ff47-8c31-4725-885c-e0e40455e7f5' };
    mockResumeReviewRepository.create.mockResolvedValueOnce(r);
    mockUserRepository.get.mockResolvedValueOnce([u]);

    await postResumeReview(req as Request, res as Response, next);

    expect(mockResumeReviewRepository.create).toBeCalledWith('67e8ff47-8c31-4725-885c-e0e40455e7f5', 'seeking_reviewer');
    expect(next).not.toBeCalled();
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith({ resumeReview: r });
});
