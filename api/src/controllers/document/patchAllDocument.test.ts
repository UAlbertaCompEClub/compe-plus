import { NextFunction, Request, Response } from 'express';
import { mocked } from 'ts-jest/utils';

import InternalServerErrorException from '../../exceptions/InternalServerErrorException';
import * as documentRepository from '../../repositories/documentRepository';
import * as resumeReviewRepository from '../../repositories/resumeReviewRepository';
import * as s3Repository from '../../repositories/s3Repository';
import testConstants from '../../util/testConstants';
import patchAllDocument from './patchAllDocument';

jest.mock('../../repositories/documentRepository');
const mockDocumentRepository = mocked(documentRepository, true);

jest.mock('../../repositories/s3Repository');
const mockS3Repository = mocked(s3Repository, true);

jest.mock('../../repositories/resumeReviewRepository');
const mockResumeReviewRepository = mocked(resumeReviewRepository, true);

type Params = {
    resumeReview: string;
    document: string;
};

let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;

beforeEach(() => {
    req = {
        body: {
            note: 'my note',
            base64Contents: Buffer.from('My file contents').toString('base64'),
        },
        params: {
            resumeReview: testConstants.resumeReview1.id,
            document: testConstants.document1.id,
        },
    };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    next = jest.fn();
    mockResumeReviewRepository.get.mockResolvedValueOnce([testConstants.resumeReview1]);
    mockDocumentRepository.get.mockResolvedValueOnce([testConstants.document1]);
});

afterEach(() => {
    jest.clearAllMocks();
});

it('rejects non-uuid resume review', async () => {
    req.params = { resumeReview: 'lolz', document: 'a41dbb6d-8957-4d67-a13c-05986cb01916' };

    await patchAllDocument(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid route parameters', status: 400, details: { resumeReview: 'Must be a UUID' } });
});

it('rejects non-uuid document', async () => {
    req.params = { resumeReview: '52c2cbdc-e0a8-48e7-9302-92a37e016ab0', document: 'lolz' };

    await patchAllDocument(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid route parameters', status: 400, details: { document: 'Must be a UUID' } });
});

it('rejects non-existent resume review', async () => {
    mockResumeReviewRepository.get.mockReset();
    mockResumeReviewRepository.get.mockResolvedValueOnce([]);
    await patchAllDocument(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid route parameters', status: 400, details: { resumeReview: 'Must be a resume review that already exists' } });
});

it('rejects non-existent document', async () => {
    mockDocumentRepository.get.mockReset();
    mockDocumentRepository.get.mockResolvedValueOnce([]);
    await patchAllDocument(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid route parameters', status: 400, details: { document: 'Must be a document that already exists' } });
});

it('rejects invalid base64Contents', async () => {
    req.body.base64Contents = '&&';

    await patchAllDocument(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid message body', status: 400, details: { base64Contents: 'Must be properly base64 encoded' } });
});

it('works with both fields as null', async () => {
    req.body = {};

    await patchAllDocument(req as Request<Params>, res as Response, next);

    expect(res.status).toBeCalledWith(204);
    expect(documentRepository.update).not.toBeCalled();
    expect(s3Repository.upload).not.toBeCalled();
});

it('works with just note field', async () => {
    req.body = { note: 'new note' };

    await patchAllDocument(req as Request<Params>, res as Response, next);

    expect(res.status).toBeCalledWith(204);
    expect(documentRepository.update).toBeCalledWith(testConstants.document1.id, 'new note');
    expect(s3Repository.upload).not.toBeCalled();
});

it('works with just base64Contents field', async () => {
    const contents = Buffer.from('My file contents').toString('base64');
    req.body = { base64Contents: contents };

    await patchAllDocument(req as Request<Params>, res as Response, next);

    expect(res.status).toBeCalledWith(204);
    expect(documentRepository.update).not.toBeCalled();
    expect(s3Repository.upload).toBeCalledWith(`resume-reviews/${testConstants.resumeReview1.id}/documents/${testConstants.document1.id}`, contents, 'base64');
});

it('works with both fields', async () => {
    await patchAllDocument(req as Request<Params>, res as Response, next);

    expect(res.status).toBeCalledWith(204);
    expect(documentRepository.update).toBeCalledWith(testConstants.document1.id, 'my note');
    expect(s3Repository.upload).toBeCalledWith(
        `resume-reviews/${testConstants.resumeReview1.id}/documents/${testConstants.document1.id}`,
        Buffer.from('My file contents').toString('base64'),
        'base64',
    );
});

it('catches error with note', async () => {
    const err = new Error('');
    mockDocumentRepository.update.mockRejectedValueOnce(err);

    await patchAllDocument(req as Request<Params>, res as Response, next);

    expect(res.status).not.toBeCalled();
    expect(next).toBeCalledWith(new InternalServerErrorException({ issue: 'Failed to update note or base64Contents. Try again with same data.' }, err));
});

it('catches error with base64Content', async () => {
    const err = new Error('');
    mockS3Repository.upload.mockRejectedValueOnce(err);

    await patchAllDocument(req as Request<Params>, res as Response, next);

    expect(res.status).not.toBeCalled();
    expect(next).toBeCalledWith(new InternalServerErrorException({ issue: 'Failed to update note or base64Contents. Try again with same data.' }, err));
});
