import { configureStore } from '@reduxjs/toolkit';

import mockInterviewReducer from './slices/mockInterviewSlice';
import resumeReviewReducer from './slices/resumeReviewSlice';
import resumeReviewViewerReducer from './slices/resumeReviewViewerSlice';
import uploadResumeReducer from './slices/uploadResumeSlice';

const store = configureStore({
    reducer: {
        resumeReview: resumeReviewReducer,
        resumeReviewViewer: resumeReviewViewerReducer,
        uploadResume: uploadResumeReducer,
        mockInterview: mockInterviewReducer,
    },
});

export type StudentState = ReturnType<typeof store.getState>;
export type StudentDispatch = typeof store.dispatch;
export default store;
