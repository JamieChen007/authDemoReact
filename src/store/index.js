import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authSlice } from "./reducer/authSlice";
import studentApi from "./studentApi";

const store = configureStore({
  reducer: {
    // [authApi.reducerPath]: authApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, studentApi.middleware),
});

setupListeners(store.dispatch);

export default store;
