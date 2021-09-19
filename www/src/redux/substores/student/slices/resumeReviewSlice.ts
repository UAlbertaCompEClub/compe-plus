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
    errorMessage: string | null;
};

const initialState: ResumeReviewState = {
    resumeReviews: [],
    isUploading: false,
    isLoading: false,
    shouldReload: true,
    errorMessage: null,
};

export const resumeReviewSlice = createSlice({
    name: 'resumeReview',
    initialState,
    reducers: {
        setIsUploadingResume: (state, action: PayloadAction<boolean>) => {
            state.isUploading = action.payload;
        },
        refreshResumes: (state) => {
            state.shouldReload = true;
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
        builder.addCase(getMyResumeReviews.rejected, (state, action) => {
            state.isLoading = false;
            if (action.payload === undefined) {
                return;
            }
            state.errorMessage = action.payload;
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

export const { setIsUploadingResume, refreshResumes } = resumeReviewSlice.actions;

export default resumeReviewSlice.reducer;
