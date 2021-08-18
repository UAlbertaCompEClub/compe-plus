import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import checkUserRegistration from '../thunks/checkUserRegistration';
import registerUser, { UserInfo } from '../thunks/registerUser';

type UserState = {
    roles: string[];
    currentRole: string;
    hasRegistered: boolean | null;
    info: UserInfo | null;
    isEditRolesDialogOpen: boolean;
    isLoading: boolean;
};

const initialState: UserState = {
    roles: [],
    currentRole: '',
    hasRegistered: null,
    info: null,
    isEditRolesDialogOpen: false,
    isLoading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        roles: [],
        currentRole: '',
        isEditRolesDialogOpen: false,
    },
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
});

export default userSlice.reducer;

export const { setCurrentRole, openEditRolesDialog, closeEditRolesDialog } = userSlice.actions;
