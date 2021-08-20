import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import fetchWithToken from '../../util/auth0/fetchWithToken';
import { getUserRole as getUserRoleEndpoint } from '../../util/endpoints';
import Scope from '../../util/scopes';
import testConstants from '../../util/testConstants';
import tc from '../../util/testConstants';
import { getUserRole, GetUserRolesResponse } from './getUserRole';

jest.mock('../../util/auth0/fetchWithToken');
const mockFetchWithToken = mocked(fetchWithToken, true);

const mockGetTokenSilently = jest.fn();

it('returns the user role when the user is registered', async () => {
    const mockResponse = {
        data: {
            roles: [testConstants.studentRole],
        },
    };
    mockFetchWithToken.mockResolvedValueOnce(mockResponse as AxiosResponse<GetUserRolesResponse>);

    const result = await getUserRole({ userId: testConstants.user1.id, tokenAcquirer: mockGetTokenSilently });

    expect(mockFetchWithToken).toBeCalledWith(getUserRoleEndpoint(testConstants.user1.id), mockGetTokenSilently, [Scope.ReadRoles]);
    expect(result).toStrictEqual(mockResponse.data);
});

it('null if the user is not registered', async () => {
    mockFetchWithToken.mockRejectedValueOnce({});

    const result = await getUserRole({ userId: testConstants.user1.id, tokenAcquirer: mockGetTokenSilently });

    expect(mockFetchWithToken).toBeCalledWith(getUserRoleEndpoint(testConstants.user1.id), mockGetTokenSilently, [Scope.ReadRoles]);
    expect(result).toBe(null);
});
