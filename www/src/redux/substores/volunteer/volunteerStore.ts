import { configureStore } from '@reduxjs/toolkit';

import resumeReviewEditorReducer from './slices/resumeReviewEditorSlice';
import resumeReviewReducer from './slices/resumeReviewSlice';

const store = configureStore({
    reducer: {
        resumeReview: resumeReviewReducer,
        resumeReviewEditor: resumeReviewEditorReducer,
    },
});

export type VolunteerState = ReturnType<typeof store.getState>;
export type VolunteerDispatch = typeof store.dispatch;
export default store;
