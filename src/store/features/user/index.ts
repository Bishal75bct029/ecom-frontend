import baseApi from '@/store/baseApi';
import { UserAddress, UserDetailType, UserState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  user: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  reducerPath: 'user',
  initialState,
  reducers: {
    setUserState: (state, { payload }: PayloadAction<Partial<UserState>>) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

const userApi = baseApi.enhanceEndpoints({ addTagTypes: ['user-detail', 'user-address'] }).injectEndpoints({
  endpoints: (builder) => ({
    getUserDetail: builder.query<UserDetailType, void>({
      query: () => ({
        url: `api/users/whoami`,
        method: 'GET',
      }),
      providesTags: ['user-detail'],
    }),
    getUserAddresses: builder.query<UserAddress[], void>({
      query: () => ({
        url: `api/users/address`,
        method: 'GET',
      }),
      providesTags: ['user-address'],
    }),
  }),
});

export const { useGetUserDetailQuery, useLazyGetUserDetailQuery, useGetUserAddressesQuery } = userApi;

export const { setUserState } = userSlice.actions;
