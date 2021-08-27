import { NextFunction, Request, Response } from 'express';
import { mocked } from 'ts-jest/utils';

import * as adminRepository from '../../repositories/adminRepository';
import { toCamelCase } from '../../util/helper';
import testConstants from '../../util/testConstants';
import getAllUsersInfo from './getAllUsersInfo';

jest.mock('../../repositories/adminRepository');
const mockAdminRepository = mocked(adminRepository, true);

let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;

beforeEach(() => {
    req = {};
    res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    next = jest.fn();
});

it('gets all users', async () => {
    const user1AndRole = { ...testConstants.user1, roles: [testConstants.userRole1.role] };
    const users = { users: [toCamelCase(user1AndRole)] };
    mockAdminRepository.getUsersInfo.mockResolvedValueOnce([user1AndRole]);

    await getAllUsersInfo(req as Request, res as Response, next);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(users);
});
