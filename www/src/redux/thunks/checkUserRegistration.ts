import { createAsyncThunk } from '@reduxjs/toolkit';

import fetchWithScopes, { TokenAcquirer } from '../../util/auth0/fetchWithScopes';
import { userMe } from '../../util/endpoints';
import { User } from '../../util/serverResponses';

const checkUserRegistration = createAsyncThunk('user/checkUserRegistration', async (tokenAcquirer: TokenAcquirer) => {
    try {
        const user = await fetchWithScopes<User>(userMe, tokenAcquirer);
        return user?.data;
    } catch (e) {
        return null;
    }
});

export default checkUserRegistration;
