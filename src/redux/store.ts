import {configureStore} from '@reduxjs/toolkit';
import tokenCounter from './TokenCounterSlice';
export const store = configureStore({
    reducer:{
        token: tokenCounter
    }
});

export type RootState = ReturnType<typeof store.getState>
export type Appdispatch = typeof store.dispatch