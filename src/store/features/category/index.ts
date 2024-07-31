import baseApi from '@/store/baseApi';
import { Category } from './types';

export const categoryApi = baseApi.enhanceEndpoints({ addTagTypes: ['category'] }).injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query<Category[], void>({
      query: () => ({
        url: `api/categories`,
        method: 'GET',
      }),
      providesTags: ['category'],
    }),
  }),
});

export const { useGetCategoryQuery, useLazyGetCategoryQuery } = categoryApi;
