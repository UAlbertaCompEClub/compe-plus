import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import checkUserRegistration from '../thunks/checkUserRegistration';
import registerUser, { UserInfo } from '../thunks/registerUser';

type UserState = {
    roles: string[];
    currentRole: string;
    hasRegistered: boolean | null;
    info: UserInfo | null;
    isLoading: boolean;
};

const initialState: UserState = {
    roles: [],
    currentRole: '',
    hasRegistered: null,
    info: null,
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
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            console.log(action);
            const isSuccess = action.payload !== undefined;
            console.log(`Register success=${isSuccess}`);
            state.isLoading = true;
        });
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
