import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import patchWithToken from '../../../util/auth0/patchWithToken';
import { patchMyResumeReview } from '../../../util/endpoints';
import Scope from '../../../util/scopes';
import testConstants from '../../../util/testConstants';
import { patchResumeReview } from './patchResumeReview';

jest.mock('../../../util/auth0/patchWithToken');
const mockPatchWithToken = mocked(patchWithToken, true);

const mockGetTokenSilently = jest.fn();

it('works on happy path', async () => {
    mockPatchWithToken.mockResolvedValueOnce({} as AxiosResponse<void>);

    const result = await patchResumeReview({
        resumeReviewId: testConstants.document1.resumeReviewId,
        tokenAcquirer: mockGetTokenSilently,
        userId: testConstants.user1.id,
    });

    expect(mockPatchWithToken).toBeCalledWith(patchMyResumeReview(testConstants.document1.resumeReviewId), mockGetTokenSilently, { state: 'finished' }, [Scope.UpdateMyResumeReviews]);

    expect(result).toBeUndefined();
});

it('throws an error if patch resume review fails', async () => {
    mockPatchWithToken.mockRejectedValueOnce({});

    await expect(
        patchResumeReview({
            resumeReviewId: testConstants.document1.resumeReviewId,
            tokenAcquirer: mockGetTokenSilently,
            userId: testConstants.user1.id,
        }),
    ).rejects.toThrow('Unable to mark resume review as finished');

    expect(mockPatchWithToken).toBeCalledWith(patchMyResumeReview(testConstants.document1.resumeReviewId), mockGetTokenSilently, { state: 'finished' }, [Scope.UpdateMyResumeReviews]);
});
