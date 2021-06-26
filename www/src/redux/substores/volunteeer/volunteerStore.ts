import { configureStore } from '@reduxjs/toolkit';

import resumeReviewReducer from './slices/resumeReviewSlice';

const store = configureStore({
    reducer: {
        resumeReview: resumeReviewReducer,
    },
});

export type VolunteerState = ReturnType<typeof store.getState>;
export type VolunteerDispatch = typeof store.dispatch;
export default store;
