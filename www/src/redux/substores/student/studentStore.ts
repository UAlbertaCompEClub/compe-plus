import { configureStore } from '@reduxjs/toolkit';

import resumeReviewReducer from './slices/resumeReviewSlice';

export default configureStore({
    reducer: {
        resumeReview: resumeReviewReducer,
    },
});
