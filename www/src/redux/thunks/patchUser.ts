import { AppState } from '@auth0/auth0-react';
import { createAsyncThunk } from '@reduxjs/toolkit';

import patchWithToken from '../../util/auth0/patchWithToken';
import TokenAcquirer from '../../util/auth0/TokenAcquirer';
import { patchUser as patchUserEndpoint } from '../../util/endpoints';
import Scope from '../../util/scopes';
import { AppDispatch } from '../store';

type PatchUserParams = {
    userId: string;
    hasAgreedToTermsOfService?: boolean;
    tokenAcquirer: TokenAcquirer;
};

export const patchUser = async (params: PatchUserParams): Promise<void> => {
    await patchWithToken(
        patchUserEndpoint(params.userId),
        params.tokenAcquirer,
        {
            hasAgreedToTermsOfService: params.hasAgreedToTermsOfService,
        },
        [Scope.UpdateUser],
    ).catch(() => {
        throw new Error('Unable to update user details');
    });
};

export type AsyncThunkConfig = {
    state: AppState;
    dispatch: AppDispatch;
    rejectValue: string;
};

export default createAsyncThunk<void, PatchUserParams, AsyncThunkConfig>('user/patchUser', (params, thunkApi) => {
    try {
        return patchUser(params);
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});
