import { createSlice } from '@reduxjs/toolkit';

import getCalendlyLink from '../thunks/getCalendlyLink';

type MockInterviewState = {
    calendlyLink: string | undefined;
    isLoading: boolean;
};

const initialState: MockInterviewState = {
    calendlyLink: undefined,
    isLoading: false,
};

export const mockInterviewSlice = createSlice({
    name: 'mockInterview',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCalendlyLink.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCalendlyLink.fulfilled, (state, action) => {
            state.isLoading = false;
            state.calendlyLink = action.payload.calendlys[0]?.link;
        });
    },
});

export default mockInterviewSlice.reducer;
