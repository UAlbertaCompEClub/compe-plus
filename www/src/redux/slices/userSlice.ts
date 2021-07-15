import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserInfo } from '../thunks/registerUser';

type UserStore = {
    roles: string[];
    currentRole: string | null;
    info: UserInfo | null;
};

const initialState: UserStore = {
    roles: [],
    currentRole: null,
    info: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentRole(state, action: PayloadAction<string>) {
            state.currentRole = action.payload;
        },
    },
});

export default userSlice.reducer;
