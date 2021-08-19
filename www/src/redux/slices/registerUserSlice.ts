import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import registerUser from '../thunks/registerUser';

type RegisterUserState = {
    year: number;
    program: string;
    registrationSuccess: boolean | null;
    isLoading: boolean;
};

const initialState: RegisterUserState = {
    year: 0,
    program: '',
    registrationSuccess: null,
    isLoading: false,
};

export const registerUserSlice = createSlice({
    name: 'registerUser',
    initialState,
    reducers: {
        setYear(state, action: PayloadAction<number>) {
            state.year = action.payload;
        },
        setProgram(state, action: PayloadAction<string>) {
            state.program = action.payload;
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

export const { setYear, setProgram } = registerUserSlice.actions;

export default registerUserSlice.reducer;
