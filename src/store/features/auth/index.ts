import baseApi from '@/store/baseApi';
import { LoginPayload } from './types';

export const authApi = baseApi.enhanceEndpoints({ addTagTypes: [] }).injectEndpoints({
  endpoints: (builder) => ({
    postLogin: builder.mutation<void, LoginPayload>({
      query: (data) => ({
        url: `api/users/login`,
        method: 'POST',
        data,
      }),
    }),
    postLogout: builder.mutation<void, void>({
      query: () => ({
        url: `api/users/logout`,
        method: 'POST',
      }),
    }),
    getUserDetail: builder.query<any, void>({
      query: () => ({
        url: `api/users/whoami`,
        method: 'GET',
      }),
    }),
  }),
});

export const { usePostLoginMutation, useGetUserDetailQuery, useLazyGetUserDetailQuery, usePostLogoutMutation } =
  authApi;
