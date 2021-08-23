import { createSlice } from '@reduxjs/toolkit';

import { ResumeReview } from '../../../../util/serverResponses';
import getAvailableResumeReviews from '../thunks/getAvailableResumeReviews';
import getReviewingResumeReviews from '../thunks/getReviewingResumeReviews';

type ResumeReviewState = {
    availableResumes: ResumeReview[];
    reviewingResumes: ResumeReview[];
    isLoading: boolean;
};

const initialState: ResumeReviewState = {
    availableResumes: [],
    reviewingResumes: [],
    isLoading: false,
};

export const resumeReviewSlice = createSlice({
    name: 'resumeReview',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAvailableResumeReviews.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAvailableResumeReviews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.availableResumes = action.payload.resumeReviews;
        });
        builder.addCase(getReviewingResumeReviews.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getReviewingResumeReviews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reviewingResumes = action.payload.resumeReviews;
        });
    },
});

export default resumeReviewSlice.reducer;
