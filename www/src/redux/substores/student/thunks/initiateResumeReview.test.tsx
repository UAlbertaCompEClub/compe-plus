import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import postWithToken from '../../../../util/auth0/postWithToken';
import { postDocuments, postResumeReviews } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { Document, ResumeReview } from '../../../../util/serverResponses';
import tc from '../../../../util/testConstants';
import { initiateResumeReview, InitiateResumeReviewParams } from './initiateResumeReview';

jest.mock('../../../../util/auth0/postWithToken');
const mockPostWithToken = mocked(postWithToken, true);

describe('initiateResumeReview', () => {
    const mockGetTokenSilently = jest.fn();
    const params: InitiateResumeReviewParams = {
        userId: tc.user1.id,
        base64Contents: 'base64',
        tokenAcquirer: mockGetTokenSilently,
    };

    afterEach(() => {
        mockPostWithToken.mockClear();
    });

    it('works on happy path', async () => {
        const postResumeReviewMockResponse = {
            data: tc.resumeReview1,
        };
        const postDocumentMockResponse = {
            data: tc.document1,
        };
        mockPostWithToken.mockResolvedValueOnce(postResumeReviewMockResponse as AxiosResponse<ResumeReview>);
        mockPostWithToken.mockResolvedValueOnce(postDocumentMockResponse as AxiosResponse<Document>);

        const result = await initiateResumeReview(params);

        expect(mockPostWithToken).toBeCalledWith(postResumeReviews, mockGetTokenSilently, [Scope.CreateResumeReviews], {
            reviewee: params.userId,
        });
        expect(mockPostWithToken).toBeCalledWith(postDocuments(tc.resumeReview1.id), mockGetTokenSilently, [Scope.CreateDocuments], {
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
        mockPostWithToken.mockRejectedValueOnce({});

        await expect(initiateResumeReview(params)).rejects.toThrow('Unable to create resume review object');

        expect(mockPostWithToken).toBeCalledWith(postResumeReviews, mockGetTokenSilently, [Scope.CreateResumeReviews], {
            reviewee: params.userId,
        });
        expect(mockPostWithToken).not.toBeCalledWith(postDocuments(tc.resumeReview1.id), mockGetTokenSilently, [Scope.CreateDocuments], {
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

        mockPostWithToken.mockResolvedValueOnce(postResumeReviewMockResponse as AxiosResponse<ResumeReview>);
        mockPostWithToken.mockRejectedValueOnce({});

        mockPostWithToken.mockRejectedValueOnce({});

        await expect(initiateResumeReview(params)).rejects.toThrow('Unable to upload document');

        expect(mockPostWithToken).toBeCalledWith(postResumeReviews, mockGetTokenSilently, [Scope.CreateResumeReviews], {
            reviewee: params.userId,
        });
        expect(mockPostWithToken).toBeCalledWith(postDocuments(tc.resumeReview1.id), mockGetTokenSilently, [Scope.CreateDocuments], {
            note: '',
            isReview: false,
            userId: params.userId,
            base64Contents: params.base64Contents,
        });
    });
});
