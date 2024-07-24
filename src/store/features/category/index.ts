import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import baseApi from '@/store/baseApi';
import { Category, CategoryState } from './types';

const initialState: CategoryState[] = [];

export const categorySlice = createSlice({
  name: 'category',
  reducerPath: 'category',
  initialState,
  reducers: {
    setCategoryState: (state, { payload }: PayloadAction<Partial<CategoryState>[]>) => {
      return [...state, ...payload] as CategoryState[];
    },
  },
});

export const categoryApi = baseApi.enhanceEndpoints({ addTagTypes: ['category'] }).injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query<Category[], void>({
      query: () => ({
        url: `/api/categories/`,
        method: 'GET',
      }),
      providesTags: ['category'],
    }),
  }),
});

export const { useGetCategoryQuery, useLazyGetCategoryQuery } = categoryApi;
