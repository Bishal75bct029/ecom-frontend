import baseApi from '@/store/baseApi';
import { Category } from './types';
import { transformCategories } from './helper';

export const categoryApi = baseApi.enhanceEndpoints({ addTagTypes: ['category'] }).injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query<Category[], void>({
      query: () => ({
        url: `api/categories`,
        method: 'GET',
      }),
      providesTags: ['category'],
      transformResponse: (response: Category[]) => transformCategories(response),
    }),
  }),
});

export const { useGetCategoryQuery, useLazyGetCategoryQuery } = categoryApi;
