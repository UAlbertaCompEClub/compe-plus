import { configureStore } from '@reduxjs/toolkit';

import resumeReviewReducer from './slices/resumeReviewSlice';
import userRolesReducer from './slices/userRoleSlice';

const store = configureStore({
    reducer: {
        resumeReview: resumeReviewReducer,
        userRoles: userRolesReducer,
    },
});

export type AdminState = ReturnType<typeof store.getState>;
export type AdminDispatch = typeof store.dispatch;
export default store;
