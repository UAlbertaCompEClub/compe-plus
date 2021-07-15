import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserStore = {
    roles: string[];
    currentRole: string | null;
    info: UserInfo | null;
};

type UserInfo = {
    id: string;
    email: string;
    ccid: string;
    program: string;
    year: number;
    givenName: string;
    familyName: string;
    fullName: string;
    photoUrl?: string;
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
