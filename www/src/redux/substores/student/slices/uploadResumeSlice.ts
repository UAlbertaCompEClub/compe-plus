import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import initiateResumeReview from '../thunks/initiateResumeReview';

type UploadResumeState = {
    document: string | null;
    isLoading: boolean;
};

const initialState: UploadResumeState = {
    document: null,
    isLoading: false,
};

export const uploadResumeSlice = createSlice({
    name: 'resumeReview/upload',
    initialState,
    reducers: {
        resetUploadResume: () => {
            return initialState;
        },
        setDocument: (state, action: PayloadAction<string>) => {
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
        });
    },
});

export const { setDocument, resetUploadResume } = uploadResumeSlice.actions;

export default uploadResumeSlice.reducer;
