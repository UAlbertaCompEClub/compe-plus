import { createSlice } from '@reduxjs/toolkit';

import getMyDocuments from '../../../../routes/volunteer/thunks/getMyDocuments';
import patchResumeReview from '../../../../routes/volunteer/thunks/patchResumeReview';
import { Document } from '../../../../util/serverResponses';

type ResumeReviewEditorState = {
    documents: Document[] | null;
    currentDocument: Document | null;
    currentDocumentFromBackend: Document | null;
    isLoading: boolean;
    isDone: boolean;
};

const initialState: ResumeReviewEditorState = {
    documents: null,
    currentDocument: null,
    currentDocumentFromBackend: null,
    isLoading: false,
    isDone: false,
};

export const resumeReviewEditorSlice = createSlice({
    name: 'resumeReview/editor',
    initialState,
    reducers: {
        cancelReviewResume: () => initialState,
        resetResumeReviewEditor: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getMyDocuments.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMyDocuments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.documents = action.payload.documents;
            state.currentDocumentFromBackend = action.payload.documents[0];
            state.currentDocument = action.payload.documents[0];
        });
        builder.addCase(patchResumeReview.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(patchResumeReview.fulfilled, (state) => {
            state.isLoading = false;
            state.isDone = true;
        });
    },
});

export const { resetResumeReviewEditor } = resumeReviewEditorSlice.actions;

export default resumeReviewEditorSlice.reducer;
