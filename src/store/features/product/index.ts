import { createSlice } from '@reduxjs/toolkit';
import { ProductType } from './types';
import baseApi from '@/store/baseApi';

const initialState: { product?: ProductType } = {
  product: undefined,
};

export const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {},
  reducerPath: 'product',
  extraReducers: (builder) => {
    builder.addMatcher(productApi.endpoints.getProductById.matchFulfilled, (state, { payload }) => {
      const variantsArray = [
        { size: 'M', color: 'blue' },
        { size: 'L', color: 'blue' },
        { size: 'XL', color: 'blue' },
        { size: 'M', color: 'red' },
        { size: 'L', color: 'red' },
        { size: 'XL', color: 'red' },
      ];
      const productMeta = payload.productMeta.map((meta, i) => ({ ...meta, variants: variantsArray[i] }));
      const product = { ...payload, attributeOptions: { size: ['M', 'L', 'XL'], color: ['blue', 'red'] }, productMeta };
      state.product = product;
    });
  },
});

const productApi = baseApi.enhanceEndpoints({ addTagTypes: ['products'] }).injectEndpoints({
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
        url: `api/products/category?categoryId=${categoryId}&productId=${productId}`,
        method: 'GET',
      }),
      providesTags: ['products'],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetProductByCategoryQuery } = productApi;

export default productSlice.reducer;
