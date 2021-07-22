import { NextFunction, Request, Response } from 'express';
import { mocked } from 'ts-jest/utils';

import BadRequestException from '../../exceptions/BadRequestException';
import * as documentRepository from '../../repositories/documentRepository';
import * as resumeReviewRepository from '../../repositories/resumeReviewRepository';
import * as s3Repository from '../../repositories/s3Repository';
import testConstants from '../../util/testConstants';
import getAllDocuments from './getAllDocuments';

jest.mock('../../repositories/documentRepository');
const mockDocumentRepository = mocked(documentRepository, true);

jest.mock('../../repositories/s3Repository');
const mockS3Repository = mocked(s3Repository, true);

jest.mock('../../repositories/resumeReviewRepository');
const mockResumeReviewRepository = mocked(resumeReviewRepository, true);

type Params = {
    resumeReview: string;
};

let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;

beforeEach(() => {
    req = {
        params: {
            resumeReview: testConstants.resumeReview1.id,
        },
        query: {},
    };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    next = jest.fn();
    mockResumeReviewRepository.get.mockResolvedValueOnce([testConstants.resumeReview1]);
});

afterEach(() => {
    jest.clearAllMocks();
});

it('rejects non-uuid resume review', async () => {
    req.params = { resumeReview: 'lolz' };

    await getAllDocuments(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid route parameters', status: 400, details: { resumeReview: 'Must be a UUID' } });
});

it('rejects non-uuid id query param', async () => {
    req.query = { id: 'asdf' };

    await getAllDocuments(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid query parameters', status: 400, details: { id: 'Must be a UUID' } });
});

it('rejects improperly encoded userId query parameter', async () => {
    req.query = { userId: `%E0%A4%A` };

    await getAllDocuments(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid query parameters', status: 400, details: { userId: 'Must be properly encoded with encodeURIComponent' } });
});

it('rejects non-uuid resumeReviewId query param', async () => {
    req.query = { resumeReviewId: 'asdf' };

    await getAllDocuments(req as Request<Params>, res as Response, next);

    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Invalid query parameters', status: 400, details: { resumeReviewId: 'Must be a UUID' } });
});

it('will not return more than 6 documents', async () => {
    mockDocumentRepository.get.mockResolvedValueOnce(
        Array(7)
            .fill(0)
            .map(() => testConstants.document1),
    );
    await getAllDocuments(req as Request<Params>, res as Response, next);

    expect(next).toBeCalledWith(new BadRequestException({ issue: 'Cannot request more than 6 documents at once. Narrow your query.' }));
});

it('correctly downloads the document', async () => {
    mockDocumentRepository.get.mockResolvedValueOnce([testConstants.document1]);

    await getAllDocuments(req as Request<Params>, res as Response, next);

    expect(res.json).toBeCalledWith({ documents: [{ ...testConstants.document1, base64Contents: undefined }] });
    expect(res.status).toBeCalledWith(200);
    expect(mockS3Repository.download).toBeCalledWith(`resume-reviews/${testConstants.resumeReview1.id}/documents/${testConstants.document1.id}`, 'base64');
});
