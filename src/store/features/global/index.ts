import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GlobalState } from './types';

const initialState: GlobalState = {
  user: undefined,
};

export const globalSlice = createSlice({
  name: 'global',
  reducerPath: 'global',
  initialState,
  reducers: {
    setGlobalState: (state, { payload }: PayloadAction<Partial<GlobalState>>) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { setGlobalState } = globalSlice.actions;
