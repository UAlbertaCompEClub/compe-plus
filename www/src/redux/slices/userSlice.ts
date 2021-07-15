import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import registerUser, { UserInfo } from '../thunks/registerUser';

type UserStore = {
    roles: string[];
    currentRole: string | null;
    info: UserInfo | null;
    isLoading: boolean;
};

const initialState: UserStore = {
    roles: [],
    currentRole: null,
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
        builder.addCase(registerUser.pending, (state, action) => {
            console.log(action);
            const isSuccess = action.payload !== undefined;
            console.log(`Register success=${isSuccess}`);
            state.isLoading = true;
        });
    },
});

export default userSlice.reducer;
