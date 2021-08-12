import { createSlice } from '@reduxjs/toolkit';

import { ResumeReview } from '../../../../util/serverResponses';
import getMyResumeReviews from '../thunks/getMyResumeReviews';

type InitialState = {
    resumeReviews: ResumeReview[];
    currentResume: string | null; // base64encoded contents
    isLoading: boolean;
};

const initialState: InitialState = {
    resumeReviews: [],
    currentResume: null,
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
            state.resumeReviews = action.payload.resumeReviews;
        });
    },
});

export default resumeReviewSlice.reducer;
