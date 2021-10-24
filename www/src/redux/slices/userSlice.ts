import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import fetchUserInfo from '../thunks/fetchUserInfo';
import getUserRole from '../thunks/getUserRole';

type UserState = {
    roles: string[];
    currentRole: string;
    hasAgreedToTermsOfService: boolean | null;
    hasRegistered: boolean | null;
    isSettingsDialogOpen: boolean;
    isLoading: boolean;
    isUserProfileOpen: boolean;
};

const initialState: UserState = {
    roles: [],
    currentRole: '',
    hasRegistered: null,
    hasAgreedToTermsOfService: null,
    isSettingsDialogOpen: false,
    isLoading: false,
    isUserProfileOpen: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentRole(state, action: PayloadAction<string>) {
            state.currentRole = action.payload;
        },
        openEditRolesDialog(state) {
            state.isSettingsDialogOpen = true;
        },
        closeEditRolesDialog(state) {
            state.isSettingsDialogOpen = false;
        },
        closeUserProfileDialog(state) {
            state.isUserProfileOpen = false;
        },
        openUserProfileDialog(state) {
            state.isUserProfileOpen = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserInfo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasRegistered = action.payload !== null;
        });
        builder.addCase(getUserRole.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getUserRole.fulfilled, (state, action) => {
            state.isLoading = false;
            state.roles = action.payload?.roles.map((roleObject) => roleObject.role) ?? [];
            state.currentRole = 'student';
        });
    },
});

export default userSlice.reducer;

export const { setCurrentRole, openEditRolesDialog, closeEditRolesDialog, closeUserProfileDialog, openUserProfileDialog } = userSlice.actions;
