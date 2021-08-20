import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import postWithToken from '../../util/auth0/postWithToken';
import { postUsers } from '../../util/endpoints';
import { WrappedUser } from '../../util/serverResponses';
import tc from '../../util/testConstants';
import { registerUser } from './registerUser';

jest.mock('../../util/auth0/postWithToken');
const mockPostWithToken = mocked(postWithToken, true);

const mockGetTokenSilently = jest.fn();

it('returns the user if the registration succeeds', async () => {
    const mockResponse = {
        data: {
            user: tc.user1,
        },
    };
    mockPostWithToken.mockResolvedValueOnce(mockResponse as AxiosResponse<WrappedUser>);

    const userInfo = { ...tc.user1, givenName: tc.user1.givenName, familyName: tc.user1.familyName, fullName: tc.user1.fullName };
    const result = await registerUser({
        // TODO: Update once camelcase has been standardized in backend responses
        userInfo,
        tokenAcquirer: mockGetTokenSilently,
    });

    expect(mockPostWithToken).toBeCalledWith(postUsers, mockGetTokenSilently, [], userInfo);
    expect(result).toStrictEqual({ user: tc.user1 });
});

it('null if the registration fails', async () => {
    mockPostWithToken.mockRejectedValueOnce({});

    const userInfo = { ...tc.user1, givenName: tc.user1.givenName, familyName: tc.user1.familyName, fullName: tc.user1.fullName };
    const result = await registerUser({
        // TODO: Update once camelcase has been standardized in backend responses
        userInfo,
        tokenAcquirer: mockGetTokenSilently,
    });

    expect(mockPostWithToken).toBeCalledWith(postUsers, mockGetTokenSilently, [], userInfo);
    expect(result).toBe(null);
});
