import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import postWithToken from '../../../../util/auth0/postWithToken';
import { postDocuments, postResumeReviews } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { Document, ResumeReview } from '../../../../util/serverResponses';
import tc from '../../../../util/testConstants';
import { initiateResumeReview, InitiateResumeReviewParams } from './initiateResumeReview';

jest.mock('../../../../util/auth0/postWithToken');
const postWithTokenMock = mocked(postWithToken, true);

const getTokenSilentlyMock = jest.fn();
const params: InitiateResumeReviewParams = {
    userId: tc.user1.id,
    base64Contents: 'base64',
    tokenAcquirer: getTokenSilentlyMock,
};

afterEach(() => {
    postWithTokenMock.mockClear();
});

it('works on happy path', async () => {
    const postResumeReviewMockResponse = {
        data: tc.resumeReview1,
    };
    const postDocumentMockResponse = {
        data: tc.document1,
    };
    postWithTokenMock.mockResolvedValueOnce(postResumeReviewMockResponse as AxiosResponse<ResumeReview>);
    postWithTokenMock.mockResolvedValueOnce(postDocumentMockResponse as AxiosResponse<Document>);

    const result = await initiateResumeReview(params);

    expect(postWithTokenMock).toBeCalledWith(postResumeReviews, getTokenSilentlyMock, [Scope.CreateResumeReviews], {
        reviewee: params.userId,
    });
    expect(postWithTokenMock).toBeCalledWith(postDocuments(tc.resumeReview1.id), getTokenSilentlyMock, [Scope.CreateDocuments], {
        note: '',
        isReview: false,
        userId: params.userId,
        base64Contents: params.base64Contents,
    });
    expect(result).toStrictEqual({
        resumeReview: tc.resumeReview1,
        document: tc.document1,
    });
});

it('throws an error if create resume review failed', async () => {
    postWithTokenMock.mockRejectedValueOnce({});

    await expect(initiateResumeReview(params)).rejects.toThrow('Unable to create resume review object');

    expect(postWithTokenMock).toBeCalledWith(postResumeReviews, getTokenSilentlyMock, [Scope.CreateResumeReviews], {
        reviewee: params.userId,
    });
    expect(postWithTokenMock).not.toBeCalledWith(postDocuments(tc.resumeReview1.id), getTokenSilentlyMock, [Scope.CreateDocuments], {
        note: '',
        isReview: false,
        userId: params.userId,
        base64Contents: params.base64Contents,
    });
});

it('throws an error if create document failed', async () => {
    const postResumeReviewMockResponse = {
        data: tc.resumeReview1,
    };

    postWithTokenMock.mockResolvedValueOnce(postResumeReviewMockResponse as AxiosResponse<ResumeReview>);
    postWithTokenMock.mockRejectedValueOnce({});

    postWithTokenMock.mockRejectedValueOnce({});

    await expect(initiateResumeReview(params)).rejects.toThrow('Unable to upload document');

    expect(postWithTokenMock).toBeCalledWith(postResumeReviews, getTokenSilentlyMock, [Scope.CreateResumeReviews], {
        reviewee: params.userId,
    });
    expect(postWithTokenMock).toBeCalledWith(postDocuments(tc.resumeReview1.id), getTokenSilentlyMock, [Scope.CreateDocuments], {
        note: '',
        isReview: false,
        userId: params.userId,
        base64Contents: params.base64Contents,
    });
});
