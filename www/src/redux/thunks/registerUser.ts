import { createAsyncThunk } from '@reduxjs/toolkit';

import { users_endpoint } from '../../endpoints';
import { postWithToken } from '../../util/auth0/postWithToken';
import TokenAcquirer from '../../util/auth0/TokenAcquirer';

export type UserInfo = {
    id: string;
    email: string;
    ccid: string;
    program: string;
    year: number;
    givenName: string;
    familyName: string;
    fullName: string;
    photoUrl?: string;
};

export type RegisterUserParameters = {
    userInfo: UserInfo;
    tokenAcquirer: TokenAcquirer;
};

export const registerUser = async ({ userInfo, tokenAcquirer }: RegisterUserParameters): Promise<UserInfo | undefined> => {
    const response = await postWithToken(users_endpoint, tokenAcquirer, [], userInfo);
    return response?.data as UserInfo;
};

export default createAsyncThunk('user/register', registerUser);
