import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import checkUserRegistration from '../thunks/checkUserRegistration';

type UserState = {
    roles: string[];
    currentRole: string;
    hasRegistered: boolean | null;
    isLoading: boolean;
};

const initialState: UserState = {
    roles: [],
    currentRole: '',
    hasRegistered: null,
    isLoading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentRole(state, action: PayloadAction<string>) {
            state.currentRole = action.payload;
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
    },
});

export default userSlice.reducer;
