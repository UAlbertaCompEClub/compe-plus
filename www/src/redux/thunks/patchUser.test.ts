import { mocked } from 'ts-jest/utils';

import patchWithToken from '../../util/auth0/patchWithToken';
import { patchUser as patchUserEndpoint } from '../../util/endpoints';
import Scope from '../../util/scopes';
import testConstants from '../../util/testConstants';
import patchUser from './patchUser';

jest.mock('../../util/auth0/patchWithToken');
const mockPatchWithToken = mocked(patchWithToken, true);

let mockGetAccessTokenSilently: jest.MockedFunction<() => Promise<string>>;

beforeEach(() => {
    mockGetAccessTokenSilently = jest.fn();
});

it('patches to the /users/:id endpoint', async () => {
    await patchUser({
        userId: testConstants.user1.id,
        tokenAcquirer: mockGetAccessTokenSilently,
        hasAgreedToTermsOfService: true,
    });

    expect(mockPatchWithToken).toBeCalledWith(
        patchUserEndpoint(testConstants.user1.id),
        mockGetAccessTokenSilently,
        {
            hasAgreedToTermsOfService: true,
        },
        [Scope.UpdateUser],
    );
});

it('throws an error when request fails', async () => {
    mockPatchWithToken.mockRejectedValueOnce({});

    await expect(
        patchUser({
            userId: testConstants.user1.id,
            tokenAcquirer: mockGetAccessTokenSilently,
            hasAgreedToTermsOfService: true,
        }),
    ).rejects.toThrow('Unable to fetch documents');
});
