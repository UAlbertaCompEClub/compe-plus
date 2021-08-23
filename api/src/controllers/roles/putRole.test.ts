import { NextFunction, Request, Response } from 'express';
import { mocked } from 'ts-jest/utils';

import * as auth0Repository from '../../repositories/auth0Repository';
import * as userRepository from '../../repositories/userRepository';
import * as userRolesRepository from '../../repositories/userRolesRepository';
import { toCamelCase } from '../../util/helper';
import testConstants from '../../util/testConstants';
import putRole from './putRole';

jest.mock('../../repositories/userRolesRepository');
const mockUserRolesRepository = mocked(userRolesRepository, true);
jest.mock('../../repositories/userRepository');
const mockUserRepository = mocked(userRepository, true);
jest.mock('../../repositories/auth0Repository');
const mocAuth0Repository = mocked(auth0Repository, true);

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
    mocAuth0Repository.giveUserRole.mockResolvedValue();
    mockUserRepository.get.mockResolvedValue([testConstants.user1]);
    mockUserRolesRepository.get.mockResolvedValue([testConstants.role1]);
    mockUserRolesRepository.assign.mockResolvedValue(testConstants.role2);
});

afterEach(() => {
    jest.clearAllMocks();
});

it('rejects user does not exist', async () => {
    mockUserRepository.get.mockResolvedValueOnce([]);

    await putRole(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid route parameters', status: 400, details: { userId: 'Must be a user that already exists' } });
});

it('rejects invalid role', async () => {
    req.params = {
        userId: encodeURIComponent(testConstants.user1.id),
        role: 'volunteer',
    };

    await putRole(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid route parameters', status: 400, details: { role: 'Must be a valid role' } });
});

it('returns 409 if role already assigned', async () => {
    mockUserRolesRepository.get.mockResolvedValueOnce([testConstants.role2]);

    await putRole(req as Request<Params>, res as Response, next);

    expect(res.status).toBeCalledWith(409);
    expect(res.json).toBeCalledWith(toCamelCase(testConstants.role2));
});

it('works on happy path', async () => {
    await putRole(req as Request<Params>, res as Response, next);

    expect(res.status).toBeCalledWith(204);
    expect(res.json).toBeCalledWith(toCamelCase(testConstants.role2));
});
