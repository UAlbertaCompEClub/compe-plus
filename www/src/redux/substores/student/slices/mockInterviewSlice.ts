import { createSlice } from '@reduxjs/toolkit';

import getCalendlys from '../thunks/getCalendlys';

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
        builder.addCase(getCalendlys.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCalendlys.fulfilled, (state, action) => {
            // Search for the interviewee in the fetched calendlys
            state.calendlyLink = action.payload.calendlys.filter((calendly) => calendly.interviewees?.includes(action.payload.intervieweeId)).map((calendly) => calendly.link)[0];

            state.isLoading = false;
        });
    },
});

export default mockInterviewSlice.reducer;
