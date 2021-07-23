import { createAsyncThunk } from '@reduxjs/toolkit';

import fetchWithScopes from '../../util/auth0/fetchWithScopes';
import { userMe } from '../../util/endpoints';
import { User } from '../../util/serverResponses';

const checkUserRegistration = createAsyncThunk('user/checkUserRegistration', async () => {
    try {
        const user = await fetchWithScopes<User>(userMe);
        return user?.data;
    } catch (e) {
        return null;
    }
});

export default checkUserRegistration;
