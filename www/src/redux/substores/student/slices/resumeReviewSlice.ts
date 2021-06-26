import { createSlice } from '@reduxjs/toolkit';

export const resumeReviewSlice = createSlice({
    name: 'resumeReview',
    initialState: {
        resumes: [],
        currentResume: null,
    },
    reducers: {},
});

export default resumeReviewSlice.reducer;
