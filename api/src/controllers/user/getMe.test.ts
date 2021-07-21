import { NextFunction, Request, Response } from 'express';
import { mocked } from 'ts-jest/utils';

import * as userRepository from '../../repositories/userRepository';
import testConstants from '../../util/testConstants';
import getMe from './getMe';

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
        user: {
            sub: testConstants.user1.id,
        },
    };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    next = jest.fn();
    mockUserRepository.get.mockResolvedValue([testConstants.user1]);
});

it('returns 404 on user that does not exist', async () => {
    mockUserRepository.get.mockResolvedValueOnce([]);

    await getMe(req as Request<Params>, res as Response, next);

    expect(res.status).toBeCalledWith(404);
});

it('works on happy path', async () => {
    await getMe(req as Request<Params>, res as Response, next);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ user: testConstants.user1 });
});
