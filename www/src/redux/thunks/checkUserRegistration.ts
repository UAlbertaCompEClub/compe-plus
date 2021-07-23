import { createAsyncThunk } from '@reduxjs/toolkit';

import fetchWithToken, { TokenAcquirer } from '../../util/auth0/fetchWithToken';
import { userMe } from '../../util/endpoints';
import { User } from '../../util/serverResponses';

const checkUserRegistration = createAsyncThunk('user/checkUserRegistration', async (tokenAcquirer: TokenAcquirer) => {
    try {
        const user = await fetchWithToken<User>(userMe, tokenAcquirer);
        return user?.data;
    } catch (e) {
        return null;
    }
});

export default checkUserRegistration;
