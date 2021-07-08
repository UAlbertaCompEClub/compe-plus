import { NextFunction, Request, Response } from 'express';
import { mocked } from 'ts-jest/utils';

import * as userRepository from '../../repositories/userRepository';
import postUser from './postUser';

jest.mock('../../repositories/userRepository');
const mockUserRepository = mocked(userRepository, true);

let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;

beforeEach(() => {
    req = {
        body: {
            user: 'google-oauth2|166667066666652466666',
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

it('rejects null user', async () => {
    req.body.user = null;

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { user: 'Value cannot be null' } });
});

it('rejects empty user', async () => {
    req.body.user = '';

    await postUser(req as Request, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { user: 'Value cannot be empty' } });
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
    mockUserRepository.get.mockResolvedValueOnce([]); // TODO
});

// it('works on happy path', async () => {
//     const r: s.resume_reviews.JSONSelectable = {
//         id: '52c2cbdc-e0a8-48e7-9302-92a37e016ab0',
//         state: 'seeking_reviewer',
//         created_at: '2021-06-07T04:51:55.717971+00:00',
//         updated_at: '2021-06-07T04:51:55.717971+00:00',
//         reviewee_id: '319ffe68-cac5-470f-9186-33371300c38f',
//         reviewer_id: '97cf8fdc-884d-442a-ac71-9922b8f1ee5e',
//     };
//     const u: s.users.JSONSelectable = {
//         id: '67e8ff47-8c31-4725-885c-e0e40455e7f5',
//         email: 'email@domain.com',
//         program: 'myccid',
//         program: 'compe',
//         year: 4,
//         given_name: 'bob',
//         family_name: 'saggit',
//         full_name: 'bob saggit',
//         photo_url: 'asdf.com',
//         created_at: '2021-06-14T06:09:19.373404+00:00',
//         updated_at: '2021-06-14T06:09:19.373404+00:00',
//     };
//     req.body = { reviewee: '67e8ff47-8c31-4725-885c-e0e40455e7f5' };
//     mockUserRepository.get.mockResolvedValueOnce([u]);

//     await postUser(req as Request, res as Response, next);

//     expect(next).not.toBeCalled();
//     expect(res.status).toBeCalledWith(201);
//     expect(res.json).toBeCalledWith({ resumeReview: r });
// });
