import { GetProductsListQuery, ProductType } from './types';
import baseApi from '@/store/baseApi';

const productApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['products', 'products-by-category', 'product-by-meta'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getProducts: builder.query<PaginatedResponse<ProductType>, GetProductsListQuery>({
        query: (params) => ({
          url: `api/products`,
          method: 'GET',
          params,
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
      getProductByMetaId: builder.query<ProductType, { productMetaId: string }>({
        query: ({ productMetaId }) => ({
          url: `api/products/meta/${productMetaId}`,
          method: 'GET',
        }),
        providesTags: (_, __, args) => [{ type: 'product-by-meta', id: args.productMetaId }],
      }),
    }),
  });

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductByCategoryQuery,
  useLazyGetProductByMetaIdQuery,
} = productApi;
