import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import initiateResumeReview from '../thunks/initiateResumeReview';

type UploadResumeState = {
    document: Document | null;
    isLoading: boolean;
    isUploadComplete: boolean | null;
};

const initialState: UploadResumeState = {
    document: null,
    isLoading: false,
    isUploadComplete: null,
};

type Document = {
    name: string;
    base64Contents: string;
};

export const uploadResumeSlice = createSlice({
    name: 'resumeReview/upload',
    initialState,
    reducers: {
        resetUploadResume: () => {
            return initialState;
        },
        setDocument: (state, action: PayloadAction<Document>) => {
            state.document = action.payload;
        },
    },
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
            state.isUploadComplete = true;
        });
    },
});

export const { setDocument, resetUploadResume } = uploadResumeSlice.actions;

export default uploadResumeSlice.reducer;
