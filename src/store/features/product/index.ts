import { ProductType } from './types';
import baseApi from '@/store/baseApi';

const productApi = baseApi.enhanceEndpoints({ addTagTypes: ['products', 'products-by-category'] }).injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductType[], void>({
      query: () => ({
        url: `api/products`,
        method: 'GET',
      }),
      providesTags: ['products'],
    }),
    getProductById: builder.query<ProductType, { id: string }>({
      query: ({ id }) => ({
        url: `api/products/${id}`,
        method: 'GET',
      }),
      providesTags: (_, __, args) => [{ type: 'products', id: args.id }],
    }),
    getProductByCategory: builder.query<ProductType[], { categoryId: string; productId: string }>({
      query: ({ categoryId, productId }) => ({
        url: `api/products/category`,
        method: 'GET',
        params: { categoryId, productId },
      }),
      providesTags: (_, __, args) => [{ type: 'products-by-category', id: args.categoryId }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetProductByCategoryQuery } = productApi;
