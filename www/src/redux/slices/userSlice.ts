import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import checkUserRegistration from '../thunks/checkUserRegistration';
import getUserRole from '../thunks/getUserRole';

type UserState = {
    roles: string[];
    currentRole: string;
    hasRegistered: boolean | null;
    isEditRolesDialogOpen: boolean;
    isLoading: boolean;
};

const initialState: UserState = {
    roles: [],
    currentRole: '',
    hasRegistered: null,
    isEditRolesDialogOpen: false,
    isLoading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentRole(state, action: PayloadAction<string>) {
            state.currentRole = action.payload;
        },
        openEditRolesDialog(state) {
            state.isEditRolesDialogOpen = true;
        },
        closeEditRolesDialog(state) {
            state.isEditRolesDialogOpen = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(checkUserRegistration.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(checkUserRegistration.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasRegistered = action.payload !== null;
        });
        builder.addCase(getUserRole.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getUserRole.fulfilled, (state, action) => {
            state.isLoading = false;
            state.roles = action.payload?.roles.map((roleObject) => roleObject.role) ?? [];
            state.currentRole = 'reviewer';
        });
    },
});

export default userSlice.reducer;

export const { setCurrentRole, openEditRolesDialog, closeEditRolesDialog } = userSlice.actions;
