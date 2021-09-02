import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import patchWithToken from '../../../util/auth0/patchWithToken';
import { patchMyDocument, patchMyResumeReview } from '../../../util/endpoints';
import Scope from '../../../util/scopes';
import testConstants from '../../../util/testConstants';
import { patchResumeReview } from './patchResumeReview';

jest.mock('../../../util/auth0/patchWithToken');
const mockPatchWithToken = mocked(patchWithToken, true);

const mockGetTokenSilently = jest.fn();

it('works on happy path', async () => {
    mockPatchWithToken.mockResolvedValueOnce({} as AxiosResponse<void>);
    mockPatchWithToken.mockResolvedValueOnce({} as AxiosResponse<void>);

    const result = await patchResumeReview({
        resumeReviewId: testConstants.document1.resumeReviewId,
        tokenAcquirer: mockGetTokenSilently,
        documentId: testConstants.document1.id,
        document: testConstants.document1.base64Contents,
        userId: testConstants.user1.id,
    });

    expect(mockPatchWithToken).toBeCalledWith(
        patchMyDocument(testConstants.document1.resumeReviewId, testConstants.document1.id),
        mockGetTokenSilently,
        {
            note: '',
            base64Contents: testConstants.document1.base64Contents,
        },
        [Scope.UpdateMyDocuments],
    );
    expect(mockPatchWithToken).toBeCalledWith(patchMyResumeReview(testConstants.document1.resumeReviewId), mockGetTokenSilently, { state: 'finished' }, [Scope.UpdateMyResumeReviews]);

    expect(result).toBeUndefined();
});

it('throws an error if patch document fails', async () => {
    mockPatchWithToken.mockRejectedValueOnce({});

    await expect(
        patchResumeReview({
            resumeReviewId: testConstants.document1.resumeReviewId,
            tokenAcquirer: mockGetTokenSilently,
            documentId: testConstants.document1.id,
            document: testConstants.document1.base64Contents,
            userId: testConstants.user1.id,
        }),
    ).rejects.toThrow('Unable to patch document');

    expect(mockPatchWithToken).toBeCalledWith(
        patchMyDocument(testConstants.document1.resumeReviewId, testConstants.document1.id),
        mockGetTokenSilently,
        {
            note: '',
            base64Contents: testConstants.document1.base64Contents,
        },
        [Scope.UpdateMyDocuments],
    );
});

it('throws an error if patch resume review fails', async () => {
    mockPatchWithToken.mockResolvedValueOnce({} as AxiosResponse<void>);
    mockPatchWithToken.mockRejectedValueOnce({});

    await expect(
        patchResumeReview({
            resumeReviewId: testConstants.document1.resumeReviewId,
            tokenAcquirer: mockGetTokenSilently,
            documentId: testConstants.document1.id,
            document: testConstants.document1.base64Contents,
            userId: testConstants.user1.id,
        }),
    ).rejects.toThrow('Unable to mark resume review as finished');

    expect(mockPatchWithToken).toBeCalledWith(
        patchMyDocument(testConstants.document1.resumeReviewId, testConstants.document1.id),
        mockGetTokenSilently,
        {
            note: '',
            base64Contents: testConstants.document1.base64Contents,
        },
        [Scope.UpdateMyDocuments],
    );
    expect(mockPatchWithToken).toBeCalledWith(patchMyResumeReview(testConstants.document1.resumeReviewId), mockGetTokenSilently, { state: 'finished' }, [Scope.UpdateMyResumeReviews]);
});
