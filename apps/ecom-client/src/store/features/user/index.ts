import baseApi from '@/store/baseApi';
import { UserAddress, UserDetailType, UserState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getStorageItem } from '@/utils';

const initialState: UserState = {
  user: undefined,
  token: getStorageItem('token'),
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
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.getUserDetail.matchFulfilled, (state, action) => {
      state.user = action.payload;
    });
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
    postUserAddresses: builder.mutation<UserAddress, Omit<UserAddress, 'id'>>({
      query: (data) => ({
        url: `api/users/address`,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['user-address'],
    }),
    putUserAddresses: builder.mutation<UserAddress, UserAddress>({
      query: ({ id, ...data }) => ({
        url: `api/users/address/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['user-address'],
    }),
  }),
});

export const {
  useGetUserDetailQuery,
  useLazyGetUserDetailQuery,
  useGetUserAddressesQuery,
  usePostUserAddressesMutation,
  usePutUserAddressesMutation,
} = userApi;

export const { setUserState } = userSlice.actions;
