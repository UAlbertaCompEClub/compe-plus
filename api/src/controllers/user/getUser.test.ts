import { NextFunction, Request, Response } from 'express';
import { mocked } from 'ts-jest/utils';

import NotAuthorizedException from '../../exceptions/NotAuthorizedException';
import * as userRepository from '../../repositories/userRepository';
import testConstants from '../../util/testConstants';
import getUser from './getUser';

jest.mock('../../repositories/userRepository');
const mockUserRepository = mocked(userRepository, true);

type Params = {
    user: string;
};

let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;

beforeEach(() => {
    req = {
        params: {
            user: encodeURIComponent(testConstants.user1.id),
        },
        user: {
            sub: testConstants.user1.id,
        },
    };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    next = jest.fn();
    mockUserRepository.get.mockResolvedValue([testConstants.user1]);
});

it('rejects non-encoded user id', async () => {
    req.params = { user: '%E0%A4%A' };

    await getUser(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid path parameters', status: 400, details: { user: 'Must be properly encoded with encodeURIComponent' } });
});

it('rejects non-matching user id', async () => {
    req.params = { user: testConstants.user1.id };
    if (req.user !== undefined) {
        req.user.sub = testConstants.user2.id;
    }

    await getUser(req as Request<Params>, res as Response, next);

    const e = new NotAuthorizedException();
    expect(next).toBeCalledWith(e);
});

it('returns 200 on user that does not exist', async () => {
    mockUserRepository.get.mockResolvedValueOnce([]);

    await getUser(req as Request<Params>, res as Response, next);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ exists: false });
});

it('works on happy path', async () => {
    await getUser(req as Request<Params>, res as Response, next);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ exists: true });
});
