import { createAsyncThunk } from '@reduxjs/toolkit';

import fetchWithScopes from '../../util/auth0/fetchWithScopes';
import { userMe } from '../../util/endpoints';
import { User } from '../../util/serverResponses';

const checkUserRegistration = createAsyncThunk('user/checkUserRegistration', async () => {
    const user = await fetchWithScopes(userMe);
    return user?.data as User;
});

export default checkUserRegistration;
