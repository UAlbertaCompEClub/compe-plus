import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ResumeReview } from '../../../../util/serverResponses';
import getMyResumeReviews from '../thunks/getMyResumeReviews';

type ResumeReviewState = {
    resumeReviews: ResumeReview[];
    isLoading: boolean;
    isUploading: boolean;
};

const initialState: ResumeReviewState = {
    resumeReviews: [],
    isUploading: false,
    isLoading: false,
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
        });
    },
});

export const { setIsUploadingResume } = resumeReviewSlice.actions;

export default resumeReviewSlice.reducer;
