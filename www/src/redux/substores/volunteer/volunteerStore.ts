import { configureStore } from '@reduxjs/toolkit';

import mockInterviewReducer from './slices/mockInterviewSlice';
import resumeReviewEditorReducer from './slices/resumeReviewEditorSlice';
import resumeReviewReducer from './slices/resumeReviewSlice';

const store = configureStore({
    reducer: {
        resumeReview: resumeReviewReducer,
        resumeReviewEditor: resumeReviewEditorReducer,
        mockInterview: mockInterviewReducer,
    },
});

export type VolunteerState = ReturnType<typeof store.getState>;
export type VolunteerDispatch = typeof store.dispatch;
export default store;
