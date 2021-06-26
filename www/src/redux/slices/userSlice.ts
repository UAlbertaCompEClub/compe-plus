import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'user',
    initialState: {
        roles: [],
        currentRole: 'student',
    },
    reducers: {},
});

export default counterSlice.reducer;
