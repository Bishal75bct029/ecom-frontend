import baseApi from '@/store/baseApi';
import { LoginPayload, LoginResponse } from './types';

export const authApi = baseApi.enhanceEndpoints({ addTagTypes: ['user-detail', 'products'] }).injectEndpoints({
  endpoints: (builder) => ({
    postLogin: builder.mutation<LoginResponse, LoginPayload>({
      query: (data) => ({
        url: `api/users/login`,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['user-detail', 'products'],
    }),
    postLogout: builder.mutation<void, void>({
      query: () => ({
        url: `api/users/logout`,
        method: 'POST',
      }),
    }),
  }),
});

export const { usePostLoginMutation, usePostLogoutMutation } = authApi;
