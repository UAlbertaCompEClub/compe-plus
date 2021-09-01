import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import fetchWithToken from '../../../util/auth0/fetchWithToken';
import { getMyDocuments as getMyDocumentsEndpoint } from '../../../util/endpoints';
import Scope from '../../../util/scopes';
import { WrappedDocuments } from '../../../util/serverResponses';
import testConstants from '../../../util/testConstants';
import { getMyDocuments } from './getMyDocuments';

jest.mock('../../../util/auth0/fetchWithToken');
const mockFetchWithToken = mocked(fetchWithToken, true);

const mockGetTokenSilently = jest.fn();

it('returns the documents on success', async () => {
    const mockResponse = {
        data: {
            documents: [testConstants.document1],
        },
    };
    mockFetchWithToken.mockResolvedValueOnce(mockResponse as AxiosResponse<WrappedDocuments>);

    const result = await getMyDocuments({ resumeReviewId: testConstants.document1.resumeReviewId, tokenAcquirer: mockGetTokenSilently });

    expect(mockFetchWithToken).toBeCalledWith(getMyDocumentsEndpoint(testConstants.document1.resumeReviewId), mockGetTokenSilently, [Scope.ReadMyDocuments]);
    expect(result).toStrictEqual(mockResponse.data);
});

it('throws an error if fetch fails', async () => {
    mockFetchWithToken.mockRejectedValueOnce({});

    await expect(getMyDocuments({ resumeReviewId: testConstants.document1.resumeReviewId, tokenAcquirer: mockGetTokenSilently })).rejects.toThrow('Unable to fetch documents');
});
