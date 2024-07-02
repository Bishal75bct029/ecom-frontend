import { configureStore } from '@reduxjs/toolkit';
import { todoApis } from './features/todo/todoApis';

export const store = configureStore({
  reducer: {
    [todoApis.reducerPath]: todoApis.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(todoApis.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
