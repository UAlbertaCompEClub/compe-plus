import { createSlice } from '@reduxjs/toolkit';

import { Document } from '../../../../util/serverResponses';
import getMyDocuments from '../thunks/getMyDocuments';

type ResumeReviewViewerState = {
    currentDocument: Document | null;
    isLoading: boolean;
    isDone: boolean;
};

const initialState: ResumeReviewViewerState = {
    currentDocument: null,
    isLoading: false,
    isDone: false,
};

export const resumeReviewSlice = createSlice({
    name: 'resumeReview/viewer',
    initialState,
    reducers: {
        resetResumeReviewViewer: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getMyDocuments.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMyDocuments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentDocument = action.payload.documents[0];
        });
    },
});

export const { resetResumeReviewViewer } = resumeReviewSlice.actions;

export default resumeReviewSlice.reducer;
