import { NextFunction, Request, Response } from 'express';
import { mocked } from 'ts-jest/utils';

import * as auth0Repository from '../../repositories/auth0Repository';
import * as userRepository from '../../repositories/userRepository';
import * as userRolesRepository from '../../repositories/userRolesRepository';
import { manyToCamelCase } from '../../util/helper';
import testConstants from '../../util/testConstants';
import deleteRole from './deleteRole';

jest.mock('../../repositories/userRolesRepository');
const mockUserRolesRepository = mocked(userRolesRepository, true);
jest.mock('../../repositories/auth0Repository');
const mockAuth0Repository = mocked(auth0Repository, true);
jest.mock('../../repositories/userRepository');
const mockUserRepository = mocked(userRepository, true);

type Params = {
    userId: string;
    role: string;
};

let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;

beforeEach(() => {
    req = {
        params: {
            userId: encodeURIComponent(testConstants.user1.id),
            role: 'reviewer',
        },
    };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    next = jest.fn();
    mockAuth0Repository.removeUserRole.mockResolvedValue();
    mockUserRepository.get.mockResolvedValue([testConstants.user1]);
    mockUserRolesRepository.get.mockResolvedValue([testConstants.role2]);
    mockUserRolesRepository.remove.mockResolvedValue([testConstants.role2]);
});

afterEach(() => {
    jest.clearAllMocks();
});

it('rejects user does not exist', async () => {
    mockUserRepository.get.mockResolvedValueOnce([]);

    await deleteRole(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid route parameters', status: 400, details: { userId: 'Must be a user that already exists' } });
});

it('rejects invalid role', async () => {
    req.params = {
        userId: encodeURIComponent(testConstants.user1.id),
        role: 'volunteer',
    };

    await deleteRole(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid route parameters', status: 400, details: { role: 'Must be a valid role' } });
});

it('returns 409 if user never had this role', async () => {
    req.params = {
        userId: encodeURIComponent(testConstants.user1.id),
        role: 'admin',
    };

    await deleteRole(req as Request<Params>, res as Response, next);

    expect(res.status).toBeCalledWith(409);
    expect(res.json).toBeCalledWith({ message: 'User with id: ' + testConstants.user1.id + ' did not have role: admin' });
});

it('returns 204 and deletes the role from user', async () => {
    req.params = {
        userId: encodeURIComponent(testConstants.user1.id),
        role: 'reviewer',
    };

    await deleteRole(req as Request<Params>, res as Response, next);

    expect(res.status).toBeCalledWith(204);
    expect(res.json).toBeCalledWith({ users: manyToCamelCase([testConstants.role2]) });
});
