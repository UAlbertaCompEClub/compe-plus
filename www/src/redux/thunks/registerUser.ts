import { createAsyncThunk } from '@reduxjs/toolkit';

import postWithToken from '../../util/auth0/postWithToken';
import TokenAcquirer from '../../util/auth0/TokenAcquirer';
import { postUsers } from '../../util/endpoints';
import { User } from '../../util/serverResponses';

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

type PostUserResponse = {
    user: Omit<User, 'updatedAt' | 'createdAt'>;
};

export const registerUser = async ({ userInfo, tokenAcquirer }: RegisterUserParameters): Promise<PostUserResponse | undefined | null> => {
    try {
        const response = await postWithToken<UserInfo, PostUserResponse>(postUsers, tokenAcquirer, [], userInfo);
        return response?.data;
    } catch (e) {
        return null;
    }
};

export default createAsyncThunk('user/register', registerUser);
