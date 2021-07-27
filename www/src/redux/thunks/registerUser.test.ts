import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import postWithToken from '../../util/auth0/postWithToken';
import { users } from '../../util/endpoints';
import { WrappedUser } from '../../util/serverResponses';
import tc from '../../util/testConstants';
import { registerUser } from './registerUser';

jest.mock('../../util/auth0/postWithToken');
const postWithTokenMock = mocked(postWithToken, true);

const getTokenSilentlyMock = jest.fn();

it('returns the user if the registration succeeds', async () => {
    const mockResponse = {
        data: {
            user: tc.user1,
        },
    };
    postWithTokenMock.mockResolvedValueOnce(mockResponse as AxiosResponse<WrappedUser>);

    const userInfo = { ...tc.user1, givenName: tc.user1.given_name, familyName: tc.user1.family_name, fullName: tc.user1.full_name };
    const result = await registerUser({
        // TODO: Update once camelcase has been standardized in backend responses
        userInfo,
        tokenAcquirer: getTokenSilentlyMock,
    });

    expect(postWithTokenMock).toBeCalledWith(users, getTokenSilentlyMock, [], userInfo);
    expect(result).toStrictEqual({ user: tc.user1 });
});

it('null if the registration fails', async () => {
    postWithTokenMock.mockRejectedValueOnce({});

    const userInfo = { ...tc.user1, givenName: tc.user1.given_name, familyName: tc.user1.family_name, fullName: tc.user1.full_name };
    const result = await registerUser({
        // TODO: Update once camelcase has been standardized in backend responses
        userInfo,
        tokenAcquirer: getTokenSilentlyMock,
    });

    expect(postWithTokenMock).toBeCalledWith(users, getTokenSilentlyMock, [], userInfo);
    expect(result).toBe(null);
});
