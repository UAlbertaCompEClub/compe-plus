import { createAsyncThunk } from '@reduxjs/toolkit';

import fetchWithToken from '../../util/auth0/fetchWithToken';
import TokenAcquirer from '../../util/auth0/TokenAcquirer';
import { getUserRole as getUserRoleEndpoint } from '../../util/endpoints';
import Scope from '../../util/scopes';
import { Role } from '../../util/serverResponses';

export type GetUserRoleParameters = {
    userId: string;
    tokenAcquirer: TokenAcquirer;
};

export type GetUserRolesResponse = {
    roles: Role[];
};

export const getUserRole = async ({ userId, tokenAcquirer }: GetUserRoleParameters): Promise<GetUserRolesResponse | undefined | null> => {
    try {
        const response = await fetchWithToken<GetUserRolesResponse>(getUserRoleEndpoint(userId), tokenAcquirer, [Scope.ReadRoles]);
        return response?.data;
    } catch (e) {
        return null;
    }
};

export default createAsyncThunk('user/getRole', getUserRole);
