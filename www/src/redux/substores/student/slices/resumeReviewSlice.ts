import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ResumeReviewWithUserDetails } from '../../../../util/serverResponses';
import cancelMyResumeReview from '../thunks/cancelResumeReview';
import getMyResumeReviews from '../thunks/getMyResumeReviews';
import initiateResumeReview from '../thunks/initiateResumeReview';

type ResumeReviewState = {
    resumeReviews: ResumeReviewWithUserDetails[];
    isLoading: boolean;
    isUploading: boolean;
    shouldReload: boolean;
};

const initialState: ResumeReviewState = {
    resumeReviews: [],
    isUploading: false,
    isLoading: false,
    shouldReload: true,
};

export const resumeReviewSlice = createSlice({
    name: 'resumeReview',
    initialState,
    reducers: {
        setIsUploadingResume: (state, action: PayloadAction<boolean>) => {
            state.isUploading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMyResumeReviews.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMyResumeReviews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.resumeReviews = action.payload.resumeReviews;
            state.shouldReload = false;
        });
        builder.addCase(cancelMyResumeReview.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(cancelMyResumeReview.fulfilled, (state) => {
            state.isLoading = false;
            state.shouldReload = true;
        });
        builder.addCase(initiateResumeReview.fulfilled, (state) => {
            state.shouldReload = true;
        });
    },
});

export const { setIsUploadingResume } = resumeReviewSlice.actions;

export default resumeReviewSlice.reducer;
