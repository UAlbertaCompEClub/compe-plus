import { NextFunction, Request, Response } from 'express';
import { mocked } from 'ts-jest/utils';

import InternalServerErrorException from '../../exceptions/InternalServerErrorException';
import * as auth0Repository from '../../repositories/auth0Repository';
import * as userRepository from '../../repositories/userRepository';
import testConstants from '../../util/testConstants';
import postUser from './postUser';

jest.mock('../../repositories/userRepository');
const mockUserRepository = mocked(userRepository, true);

jest.mock('../../repositories/auth0Repository');
const mockAuth0Repository = mocked(auth0Repository, true);

let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;

beforeEach(() => {
    req = {
        body: {
            id: 'google-oauth2|166667066666652466666',
            email: 'test@ualberta.ca',
            ccid: 'test',
            program: 'Computer Engineering Software Option',
            year: 2,
            givenName: 'Chuck',
            familyName: 'Norris',
            fullName: 'Chuck Norris',
            photoUrl: 'https://myphoto.com/id',
        },
    };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    next = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

it('rejects null id', async () => {
    req.body.id = null;

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { id: 'Value cannot be null' } });
});

it('rejects empty id', async () => {
    req.body.id = '';

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { id: 'Value cannot be empty' } });
});

it('rejects null email', async () => {
    req.body.email = null;

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { email: 'Value cannot be null' } });
});

it('rejects null email', async () => {
    req.body.email = '';

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { email: 'Value cannot be empty' } });
});

it('rejects invalid email', async () => {
    req.body.email = 'notanemail?a=1';

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { email: 'Not a valid email address' } });
});

it('rejects invalid email domain', async () => {
    req.body.email = 'test@gmail.com';

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { email: 'Value does not match the required pattern' } });
});

it('rejects null ccid', async () => {
    req.body.ccid = null;

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { ccid: 'Value cannot be null' } });
});

it('rejects empty ccid', async () => {
    req.body.ccid = '';

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { ccid: 'Value cannot be empty' } });
});

it('rejects null program', async () => {
    req.body.program = null;

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { program: 'Value cannot be null' } });
});

it('rejects empty program', async () => {
    req.body.program = '';

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { program: 'Value cannot be empty' } });
});

it('rejects null year', async () => {
    req.body.year = null;

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { year: 'Value cannot be null' } });
});

it('rejects invalid year', async () => {
    req.body.year = 0;

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { year: 'Value must be greater than 0' } });
});

it('rejects null givenName', async () => {
    req.body.givenName = null;

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { givenName: 'Value cannot be null' } });
});

it('rejects empty givenName', async () => {
    req.body.givenName = '';

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { givenName: 'Value cannot be empty' } });
});

it('rejects null familyName', async () => {
    req.body.familyName = null;

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { familyName: 'Value cannot be null' } });
});

it('rejects empty familyName', async () => {
    req.body.familyName = '';

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { familyName: 'Value cannot be empty' } });
});

it('rejects null fullName', async () => {
    req.body.fullName = null;

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { fullName: 'Value cannot be null' } });
});

it('rejects empty fullName', async () => {
    req.body.fullName = '';

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { fullName: 'Value cannot be empty' } });
});

it('rejects invalid photoUrl', async () => {
    req.body.photoUrl = 'htp//notaurl.com';

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { photoUrl: 'Must be a valid url' } });
});

it('will not double register a user', async () => {
    mockUserRepository.get.mockResolvedValueOnce([testConstants.user1]); // TODO

    await postUser(req as Request, res as Response, next);

    expect(mockAuth0Repository.giveUserRole).not.toBeCalled();
    expect(userRepository.create).not.toBeCalled();
    expect(res.status).toBeCalledWith(409);
    expect(res.json).toBeCalledWith({ user: testConstants.user1 });
});

it('will not write to db if it fails to reach auth0', async () => {
    const e = new InternalServerErrorException({}, new Error('test'));
    mockUserRepository.get.mockResolvedValueOnce([]);
    mockAuth0Repository.giveUserRole.mockRejectedValueOnce(e);

    await postUser(req as Request, res as Response, next);

    expect(userRepository.create).not.toBeCalled();
    expect(next).toBeCalledWith(e);
});

it('works on the happy path', async () => {
    mockUserRepository.get.mockResolvedValueOnce([]);
    mockAuth0Repository.giveUserRole.mockResolvedValueOnce();
    mockUserRepository.create.mockResolvedValueOnce([testConstants.user1, testConstants.userRole1]);

    await postUser(req as Request, res as Response, next);

    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith({ user: testConstants.user1 });
});
