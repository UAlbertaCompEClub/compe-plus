import { createSlice } from '@reduxjs/toolkit';

import { UserRole } from '../../../../util/serverResponses';
import getAllUserRoles from '../thunks/getAllUserRoles';

type UserRolesState = {
    userRoles: UserRole[];
    userRolesIsLoading: boolean;
    shouldReload: boolean;
};

const initialState: UserRolesState = {
    userRoles: [],
    userRolesIsLoading: false,
    shouldReload: true,
};

export const userRolesSlice = createSlice({
    name: 'userRoles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUserRoles.pending, (state) => {
            state.userRolesIsLoading = true;
        });
        builder.addCase(getAllUserRoles.fulfilled, (state, action) => {
            state.userRolesIsLoading = false;
            state.shouldReload = false;
            state.userRoles = action.payload.userRoles;
        });
    },
});

export default userRolesSlice.reducer;
