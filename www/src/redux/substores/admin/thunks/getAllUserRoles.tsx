import { createAsyncThunk } from '@reduxjs/toolkit';

import fetchWithToken from '../../../../util/auth0/fetchWithToken';
import TokenAcquirer from '../../../../util/auth0/TokenAcquirer';
import { getAllUsers } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { WrappedUserRoles } from '../../../../util/serverResponses';
import { VolunteerDispatch } from '../../volunteer/volunteerStore';
import { AdminState } from '../adminStore';

export type GetAllUserRolesParams = {
    tokenAcquirer: TokenAcquirer;
};

type AsyncThunkConfig = {
    state: AdminState;
    dispatch: VolunteerDispatch;
    rejectValue: string;
};

export const getAllUserRoles = async (params: GetAllUserRolesParams): Promise<WrappedUserRoles> => {
    const userRolesResult = await fetchWithToken<WrappedUserRoles>(getAllUsers, params.tokenAcquirer, [Scope.ReadAllUserRoles], { state: 'seeking_all_user_roles' }).catch(() => {
        throw new Error('Unable to fetch all users and roles');
    });

    return userRolesResult?.data ?? { userRoles: [] };
};

export default createAsyncThunk<WrappedUserRoles, GetAllUserRolesParams, AsyncThunkConfig>('admin/getAllUserRoles', (params, thunkApi) => {
    try {
        return getAllUserRoles(params);
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});
