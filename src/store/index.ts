import { combineReducers, configureStore } from '@reduxjs/toolkit';
import baseApi from './baseApi';
import { cartSlice } from './features/cart';
import { userSlice } from './features/user';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [cartSlice.reducerPath]: cartSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
