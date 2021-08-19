import { configureStore } from '@reduxjs/toolkit';

import registerUserReducer from './slices/registerUserSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        registerUser: registerUserReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
