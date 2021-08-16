import { createSlice } from '@reduxjs/toolkit';

import initiateResumeReview from '../thunks/initiateResumeReview';

type UploadResumeState = {
    document: string | null;
    isLoading: boolean;
};

const initialState: UploadResumeState = {
    document: null,
    isLoading: false,
};

export const resumeReviewSlice = createSlice({
    name: 'resumeReview/upload',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initiateResumeReview.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(initiateResumeReview.rejected, (state, action) => {
            // TODO: Show error message in UI
            console.error(action.payload);
        });
        builder.addCase(initiateResumeReview.fulfilled, (state) => {
            state.isLoading = false;
        });
    },
});

export default resumeReviewSlice.reducer;
