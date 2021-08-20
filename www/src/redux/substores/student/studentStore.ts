import { configureStore } from '@reduxjs/toolkit';

import resumeReviewReducer from './slices/resumeReviewSlice';
import uploadResumeReducer from './slices/uploadResumeSlice';

const store = configureStore({
    reducer: {
        resumeReview: resumeReviewReducer,
        uploadResume: uploadResumeReducer,
    },
});

export type StudentState = ReturnType<typeof store.getState>;
export type StudentDispatch = typeof store.dispatch;
export default store;
