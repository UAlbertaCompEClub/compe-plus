import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import fetchWithToken from '../../util/auth0/fetchWithToken';
import { userMe } from '../../util/endpoints';
import { User } from '../../util/serverResponses';
import tc from '../../util/testConstants';
import { checkUserRegistration } from './checkUserRegistration';

jest.mock('../../util/auth0/fetchWithToken');
const fetchWithTokenMock = mocked(fetchWithToken, true);

const getTokenSilentlyMock = jest.fn();

it('returns the user if the user exists', async () => {
    const mockResponse = {
        data: tc.user1,
    };
    fetchWithTokenMock.mockResolvedValueOnce(mockResponse as AxiosResponse<User>);

    const result = await checkUserRegistration(getTokenSilentlyMock);

    expect(fetchWithTokenMock).toBeCalledWith(userMe, getTokenSilentlyMock);
    expect(result).toBe(tc.user1);
});

it('null if the user does not exist (server returns 404)', async () => {
    fetchWithTokenMock.mockRejectedValueOnce({});

    const result = await checkUserRegistration(getTokenSilentlyMock);

    expect(fetchWithTokenMock).toBeCalledWith(userMe, getTokenSilentlyMock);
    expect(result).toBe(null);
});
