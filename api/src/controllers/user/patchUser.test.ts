import { NextFunction, Request, Response } from 'express';
import { mocked } from 'ts-jest/utils';

import NotAuthorizedException from '../../exceptions/NotAuthorizedException';
import * as userRepository from '../../repositories/userRepository';
import { toSnakeCase } from '../../util/helper';
import testConstants from '../../util/testConstants';
import patchUser from './patchUser';

jest.mock('../../repositories/userRepository');
const mockUserRepository = mocked(userRepository, true);

let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;

type Params = {
    id: string;
};

beforeEach(() => {
    req = {
        body: {
            hasAgreedToTermsOfService: false,
        },
        params: {
            id: encodeURIComponent(testConstants.user1.id),
        },
        user: {
            sub: testConstants.user1.id,
        },
    };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    next = jest.fn();

    mockUserRepository.get.mockResolvedValue([testConstants.user1]);
});

afterEach(() => {
    jest.clearAllMocks();
});

it('rejects non existing user', async () => {
    mockUserRepository.get.mockResolvedValueOnce([]);

    await patchUser(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ status: 400, details: { id: 'Must be a user that already exists' } });
});

it('rejects null hasAgreedToTermsOfService', async () => {
    req.body.hasAgreedToTermsOfService = null;

    await patchUser(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { hasAgreedToTermsOfService: 'Value cannot be null' } });
});

it("throws not authorized exception when user tries to patch another user's information", async () => {
    req.user = {
        sub: 'some-other-id',
    };

    await patchUser(req as Request<Params>, res as Response, next);

    expect(next).toBeCalledWith(new NotAuthorizedException());
});

it('works on happy path', async () => {
    req.body.hasAgreedToTermsOfService = true;

    mockUserRepository.update.mockResolvedValueOnce([testConstants.user1]);

    await patchUser(req as Request<Params>, res as Response, next);

    expect(mockUserRepository.update).toBeCalledWith(testConstants.user1.id, toSnakeCase(req.body));
    expect(res.status).toBeCalledWith(204);
});
