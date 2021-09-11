import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import getMyDocuments from '../../../../routes/volunteer/thunks/getMyDocuments';
import patchDocument from '../../../../routes/volunteer/thunks/patchDocument';
import patchResumeReview from '../../../../routes/volunteer/thunks/patchResumeReview';
import { Document } from '../../../../util/serverResponses';

type ResumeReviewEditorState = {
    documents: Document[] | null;
    currentDocument: Document | null;
    currentDocumentFromBackend: Document | null;
    isLoading: boolean;
    isSaving: boolean;
    isDone: boolean;
};

const initialState: ResumeReviewEditorState = {
    documents: null,
    currentDocument: null,
    currentDocumentFromBackend: null,
    isLoading: false,
    isSaving: false,
    isDone: false,
};

export const resumeReviewEditorSlice = createSlice({
    name: 'resumeReview/editor',
    initialState,
    reducers: {
        updateCurrentDocumentContents: (state, action: PayloadAction<string>) => {
            if (state.currentDocument === null) {
                return;
            }

            state.currentDocument.base64Contents = action.payload;
        },
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
        builder.addCase(patchDocument.pending, (state) => {
            state.isSaving = true;
        });
        builder.addCase(patchDocument.fulfilled, (state) => {
            state.isSaving = false;
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

export const { updateCurrentDocumentContents, resetResumeReviewEditor } = resumeReviewEditorSlice.actions;

export default resumeReviewEditorSlice.reducer;
