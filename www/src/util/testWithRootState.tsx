/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';

import userReducer from '../redux/slices/userSlice';
import { RootState } from '../redux/store';

function getRootStore(preloadedState: Partial<RootState>) {
    // Should match ../redux/store.ts
    return configureStore({
        reducer: {
            user: userReducer,
        },
        preloadedState: preloadedState as RootState,
    });
}

// TODO: Add shallow with RootState once https://github.com/enzymejs/enzyme/issues/2282 is resolved

function withRootState(component: React.ReactElement<any, string | React.JSXElementConstructor<any>>, preloadedState: Partial<RootState>): JSX.Element {
    return <Provider store={getRootStore(preloadedState)}>{component}</Provider>;
}

export { withRootState };
