import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
} from "redux-persist";


import useReducer from "./UserSlice";
import localStorage from "redux-persist/es/storage";

const persistConfig = {
  key: "user",
  storage: localStorage,
};

const persistedUserReducer = persistReducer(
  persistConfig,
  useReducer
);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;