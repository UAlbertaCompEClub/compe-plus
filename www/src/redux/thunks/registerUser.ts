import { createAsyncThunk } from '@reduxjs/toolkit';

import { users_endpoint } from '../../endpoints';
import { postWithToken } from '../../util/postWithToken';

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

export const registerUser = async (userInfo: UserInfo): Promise<UserInfo | undefined> => {
    const response = await postWithToken(users_endpoint, [], userInfo);
    return response?.data as UserInfo;
};

export default createAsyncThunk('user/register', registerUser);
