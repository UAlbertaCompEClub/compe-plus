import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import registerUser, { UserInfo } from '../thunks/registerUser';

type RegisterUserState = {
    userInfo: Partial<UserInfo>;
    registrationSuccess: boolean | null;
    isLoading: boolean;
};

const initialState: RegisterUserState = {
    userInfo: {},
    registrationSuccess: null,
    isLoading: false,
};

export const registerUserslice = createSlice({
    name: 'registerUser',
    initialState,
    reducers: {
        initializeUserInfo(state, action: PayloadAction<Omit<UserInfo, 'year' | 'program'>>) {
            state.userInfo = action.payload;
        },
        setYear(state, action: PayloadAction<number>) {
            state.userInfo.year = action.payload;
        },
        setProgram(state, action: PayloadAction<string>) {
            state.userInfo.program = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.registrationSuccess = action.payload !== null;
        });
    },
});

export const { initializeUserInfo, setYear, setProgram } = registerUserslice.actions;

export default registerUserslice.reducer;
