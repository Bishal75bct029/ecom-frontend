import { combineReducers, configureStore } from '@reduxjs/toolkit';
import baseApi from './baseApi';
import productReducer, { productSlice } from './features/product';
``;
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [productSlice.reducerPath]: productReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
