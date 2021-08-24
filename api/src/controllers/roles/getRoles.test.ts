import { NextFunction, Request, Response } from 'express';
import { mocked } from 'ts-jest/utils';

import * as userRepository from '../../repositories/userRepository';
import * as userRoleRepository from '../../repositories/userRolesRepository';
import testConstants from '../../util/testConstants';
import getRoles from './getRoles';

jest.mock('../../repositories/userRolesRepository');
const mockUserRoleRepository = mocked(userRoleRepository, true);

jest.mock('../../repositories/userRepository');
const mockUserRepository = mocked(userRepository, true);

type Params = {
    userId: string;
};

let req: Partial<Request<Params>>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;

beforeEach(() => {
    req = {
        params: {
            userId: encodeURIComponent(testConstants.user1.id),
        },
    };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    next = jest.fn();
});

it('rejects invalid user id', async () => {
    mockUserRepository.get.mockResolvedValueOnce([]);
    req.params = {
        userId: testConstants.user1.id,
    };

    await getRoles(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid route parameters', status: 400, details: { userId: 'Must be a user that already exists' } });
});

it('works on happy path', async () => {
    mockUserRepository.get.mockResolvedValueOnce([testConstants.user1]);
    mockUserRoleRepository.get.mockResolvedValueOnce([testConstants.role1]);

    await getRoles(req as Request<Params>, res as Response, next);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ roles: [testConstants.role1] });
});
