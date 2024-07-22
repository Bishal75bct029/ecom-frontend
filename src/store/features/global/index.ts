import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { authApi } from '../auth';
import { UserDetailType, GlobalState } from './types';

const initialState: GlobalState = {
  user: undefined,
};

export const globalSlice = createSlice({
  name: 'global',
  reducerPath: 'global',
  initialState,
  reducers: {
    setUserDetail: (state, { payload }: PayloadAction<UserDetailType>) => {
      return {
        ...state,
        user: payload,
      };
    },
    setGlobalState: (state, { payload }: PayloadAction<Partial<GlobalState>>) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.getUserDetail.matchFulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const { setUserDetail, setGlobalState } = globalSlice.actions;
