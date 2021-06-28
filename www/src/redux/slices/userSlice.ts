import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        roles: [],
        currentRole: 'student',
    },
    reducers: {},
});

export default userSlice.reducer;
