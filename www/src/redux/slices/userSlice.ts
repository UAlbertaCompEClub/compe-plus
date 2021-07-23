import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import fetchWithScopes from '../../util/auth0/fetchWithScopes';
import { userMe } from '../../util/endpoints';
import { User } from '../../util/serverResponses';

export const checkUserRegistration = createAsyncThunk('user/checkUserRegistration', async () => {
    const user = await fetchWithScopes(userMe);
    return user as User | null;
});

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        roles: [],
        currentRole: '',
        hasRegistered: false,
        isLoading: false,
    },
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
