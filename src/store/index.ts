import { combineReducers, configureStore } from '@reduxjs/toolkit';
import baseApi from './baseApi';
import { globalSlice } from './features/global';
import { cartSlice } from './features/cart';
import { categorySlice } from './features/category';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [globalSlice.reducerPath]: globalSlice.reducer,
  [cartSlice.reducerPath]: cartSlice.reducer,
  [categorySlice.reducerPath]: categorySlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
