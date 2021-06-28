import { configureStore } from '@reduxjs/toolkit';

import resumeReviewReducer from './slices/resumeReviewSlice';

const store = configureStore({
    reducer: {
        resumeReview: resumeReviewReducer,
    },
});

export type AdminState = ReturnType<typeof store.getState>;
export type AdminDispatch = typeof store.dispatch;
export default store;
