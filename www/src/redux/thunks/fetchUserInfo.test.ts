import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import fetchWithToken from '../../util/auth0/fetchWithToken';
import { getMe } from '../../util/endpoints';
import { WrappedUser } from '../../util/serverResponses';
import tc from '../../util/testConstants';
import { fetchUserInfo } from './fetchUserInfo';

jest.mock('../../util/auth0/fetchWithToken');
const mockFetchWithToken = mocked(fetchWithToken, true);

const mockGetTokenSilently = jest.fn();

it('returns the user if the user exists', async () => {
    const mockResponse = {
        data: {
            user: tc.user1,
        },
    };
    mockFetchWithToken.mockResolvedValueOnce(mockResponse as AxiosResponse<WrappedUser>);

    const result = await fetchUserInfo(mockGetTokenSilently);

    expect(mockFetchWithToken).toBeCalledWith(getMe, mockGetTokenSilently);
    expect(result).toStrictEqual({ user: tc.user1 });
});

it('null if the user does not exist (server returns 404)', async () => {
    mockFetchWithToken.mockRejectedValueOnce({});

    const result = await fetchUserInfo(mockGetTokenSilently);

    expect(mockFetchWithToken).toBeCalledWith(getMe, mockGetTokenSilently);
    expect(result).toBe(null);
});
