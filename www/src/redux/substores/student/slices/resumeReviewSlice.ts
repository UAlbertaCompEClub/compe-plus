import { createSlice } from '@reduxjs/toolkit';

import { ResumeReview } from '../../../../util/serverResponses';
import getMyResumeReviews from '../thunks/getMyResumeReviews';

type ResumeReviewState = {
    resumeReviews: ResumeReview[];
    isLoading: boolean;
};

const initialState: ResumeReviewState = {
    resumeReviews: [],
    isLoading: false,
};

export const resumeReviewSlice = createSlice({
    name: 'resumeReview',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMyResumeReviews.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMyResumeReviews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.resumeReviews = action.payload.resumeReviews;
        });
    },
});

export default resumeReviewSlice.reducer;
