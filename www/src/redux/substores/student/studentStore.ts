import { configureStore } from '@reduxjs/toolkit';

import resumeReviewReducer from './slices/resumeReviewSlice';

const store = configureStore({
    reducer: {
        resumeReview: resumeReviewReducer,
    },
});

export type StudentState = ReturnType<typeof store.getState>;
export type StudentDispatch = typeof store.dispatch;
export default store;
