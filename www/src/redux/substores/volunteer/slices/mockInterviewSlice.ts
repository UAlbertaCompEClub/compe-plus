import { createSlice } from '@reduxjs/toolkit';

import getCalendlyLink from '../thunks/getCalendlyLink';
import setCalendlyLink from '../thunks/setCalendlyLink';

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
        builder.addCase(getCalendlyLink.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getCalendlyLink.fulfilled, (state, action) => {
            state.isLoading = false;
            state.calendlyLink = action.payload.calendlys[0]?.link;
        });
        builder.addCase(setCalendlyLink.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(setCalendlyLink.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(setCalendlyLink.fulfilled, (state, action) => {
            state.isLoading = false;
            state.calendlyLink = action.payload?.calendly?.link;
        });
    },
});

export default mockInterviewSlice.reducer;
