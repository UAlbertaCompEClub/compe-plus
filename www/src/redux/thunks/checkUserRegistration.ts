import { createAsyncThunk } from '@reduxjs/toolkit';

import fetchWithToken, { TokenAcquirer } from '../../util/auth0/fetchWithToken';
import { userMe } from '../../util/endpoints';
import { User } from '../../util/serverResponses';

export const checkUserRegistration = async (tokenAcquirer: TokenAcquirer): Promise<User | undefined | null> => {
    try {
        const user = await fetchWithToken<User>(userMe, tokenAcquirer);
        return user?.data;
    } catch (e) {
        return null;
    }
};

export default createAsyncThunk('user/checkUserRegistration', checkUserRegistration);
