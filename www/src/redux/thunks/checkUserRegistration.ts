import { createAsyncThunk } from '@reduxjs/toolkit';

import fetchWithToken from '../../util/auth0/fetchWithToken';
import TokenAcquirer from '../../util/auth0/TokenAcquirer';
import { me } from '../../util/endpoints';
import { WrappedUser } from '../../util/serverResponses';

export const checkUserRegistration = async (tokenAcquirer: TokenAcquirer): Promise<WrappedUser | undefined | null> => {
    try {
        const user = await fetchWithToken<WrappedUser>(me, tokenAcquirer);
        return user?.data;
    } catch (e) {
        return null;
    }
};

export default createAsyncThunk('user/checkUserRegistration', checkUserRegistration);
