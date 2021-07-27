import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
