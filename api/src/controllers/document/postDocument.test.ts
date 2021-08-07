import { NextFunction, Request, Response } from 'express';
import { mocked } from 'ts-jest/utils';

import InternalServerErrorException from '../../exceptions/InternalServerErrorException';
import * as documentRepository from '../../repositories/documentRepository';
import * as resumeReviewRepository from '../../repositories/resumeReviewRepository';
import * as s3Repository from '../../repositories/s3Repository';
import * as userRepository from '../../repositories/userRepository';
import testConstants from '../../util/testConstants';
import postDocument from './postDocument';

jest.mock('../../repositories/documentRepository');
const mockDocumentRepository = mocked(documentRepository, true);

jest.mock('../../repositories/s3Repository');
const mockS3Repository = mocked(s3Repository, true);

jest.mock('../../repositories/resumeReviewRepository');
const mockResumeReviewRepository = mocked(resumeReviewRepository, true);

jest.mock('../../repositories/userRepository');
const mockUserRepository = mocked(userRepository, true);

type Params = {
    resumeReview: string;
};

let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;

beforeEach(() => {
    req = {
        body: {
            note: 'my note',
            isReview: false,
            userId: testConstants.user1.id,
            base64Contents: Buffer.from('My file contents').toString('base64'),
        },
        params: {
            resumeReview: testConstants.resumeReview1.id,
        },
    };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    next = jest.fn();
    mockResumeReviewRepository.get.mockResolvedValueOnce([testConstants.resumeReview1]);
    mockUserRepository.get.mockResolvedValueOnce([testConstants.user1]);
});

it('rejects non-uuid resume review', async () => {
    req.params = { resumeReview: 'lolz' };

    await postDocument(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid route parameters', status: 400, details: { resumeReview: 'Must be a UUID' } });
});

it('rejects non-existent resume review', async () => {
    mockResumeReviewRepository.get.mockReset();
    mockResumeReviewRepository.get.mockResolvedValueOnce([]);
    await postDocument(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid route parameters', status: 400, details: { resumeReview: 'Must be a resume review that already exists' } });
});

it('rejects null note', async () => {
    req.body.note = null;

    await postDocument(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { note: 'Value cannot be null' } });
});

it('rejects null isReview', async () => {
    req.body.isReview = null;

    await postDocument(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { isReview: 'Value cannot be null' } });
});

it('rejects null userId', async () => {
    req.body.userId = null;

    await postDocument(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { userId: 'Must be a user that already exists' } });
});

it('rejects non-existent user', async () => {
    mockUserRepository.get.mockReset();
    mockUserRepository.get.mockResolvedValueOnce([]);
    req.body.userId = 'asdf';

    await postDocument(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { userId: 'Must be a user that already exists' } });
});

it('rejects null base64Contents', async () => {
    req.body.base64Contents = null;

    await postDocument(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { base64Contents: 'Must be properly base64 encoded' } });
});

it('rejects invalid base64Contents', async () => {
    req.body.base64Contents = '&&';

    await postDocument(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { base64Contents: 'Must be properly base64 encoded' } });
});

it('will not upload document to s3 if db fails', async () => {
    const e = new Error('');
    mockDocumentRepository.create.mockRejectedValueOnce(e);

    await postDocument(req as Request<Params>, res as Response, next);

    expect(next).toBeCalledWith(e);
    expect(mockS3Repository.upload).not.toBeCalled();
    expect(mockDocumentRepository.remove).not.toBeCalled();
    expect(res.status).not.toBeCalled();
    expect(res.json).not.toBeCalled();
});

it('will delete document in db if upload to s3 fails', async () => {
    const e = new InternalServerErrorException({ issue: 'Failed to upload document to S3' }, new Error(''));
    mockS3Repository.upload.mockRejectedValueOnce(e);
    mockDocumentRepository.create.mockResolvedValueOnce(testConstants.document1);

    await postDocument(req as Request<Params>, res as Response, next);

    expect(mockDocumentRepository.remove).toBeCalledWith(testConstants.document1.id);
    expect(next).toBeCalledWith(e);
});

it('works on the happy path', async () => {
    mockDocumentRepository.create.mockResolvedValueOnce(testConstants.document1);
    mockS3Repository.upload.mockResolvedValueOnce();

    await postDocument(req as Request<Params>, res as Response, next);

    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith({ document: testConstants.document1 });
});
