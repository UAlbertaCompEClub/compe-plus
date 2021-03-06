import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import postWithToken from '../../../../util/auth0/postWithToken';
import { postDocument, postResumeReviews } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { WrappedDocument, WrappedResumeReview } from '../../../../util/serverResponses';
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
            data: { resumeReview: tc.resumeReview1 },
        };
        const postDocumentMockResponse = {
            data: { document: tc.document1 },
        };
        mockPostWithToken.mockResolvedValueOnce(postResumeReviewMockResponse as AxiosResponse<WrappedResumeReview>);
        mockPostWithToken.mockResolvedValueOnce(postDocumentMockResponse as AxiosResponse<WrappedDocument>);

        const result = await initiateResumeReview(params);

        expect(mockPostWithToken).toBeCalledWith(postResumeReviews, mockGetTokenSilently, [Scope.CreateResumeReviews], {
            reviewee: params.userId,
        });
        expect(mockPostWithToken).toBeCalledWith(postDocument(tc.resumeReview1.id), mockGetTokenSilently, [Scope.CreateDocuments], {
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
        expect(mockPostWithToken).not.toBeCalledWith(postDocument(tc.resumeReview1.id), mockGetTokenSilently, [Scope.CreateDocuments], {
            note: '',
            isReview: false,
            userId: params.userId,
            base64Contents: params.base64Contents,
        });
    });

    it('throws an error if create document failed', async () => {
        const postResumeReviewMockResponse = {
            data: { resumeReview: tc.resumeReview1 },
        };

        mockPostWithToken.mockResolvedValueOnce(postResumeReviewMockResponse as AxiosResponse<WrappedResumeReview>);
        mockPostWithToken.mockRejectedValueOnce({});

        mockPostWithToken.mockRejectedValueOnce({});

        await expect(initiateResumeReview(params)).rejects.toThrow('Unable to upload document');

        expect(mockPostWithToken).toBeCalledWith(postResumeReviews, mockGetTokenSilently, [Scope.CreateResumeReviews], {
            reviewee: params.userId,
        });
        expect(mockPostWithToken).toBeCalledWith(postDocument(tc.resumeReview1.id), mockGetTokenSilently, [Scope.CreateDocuments], {
            note: '',
            isReview: false,
            userId: params.userId,
            base64Contents: params.base64Contents,
        });
    });
});
