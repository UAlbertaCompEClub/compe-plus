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

const registerUser = createAsyncThunk('user/register', async (userInfo: UserInfo) => {
    const response = await postWithToken(users_endpoint, [], userInfo);
    return response?.data;
});

export default registerUser;
