import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemTransformedType, CartItemType, CartState } from './types';
import baseApi from '@/store/baseApi';
import { getStorageItem } from '@/utils';

const initialState: CartState = {
  selectedCartProducts: getStorageItem('selectedCartProducts') || [],
  selectedProductQuantities: getStorageItem('selectedProductQuantities') || {},
  selectedShippingAddress: getStorageItem('selectedShippingAddress') || undefined,
};

export const cartSlice = createSlice({
  name: 'cart',
  reducerPath: 'cart',
  initialState,
  reducers: {
    setCartState: (state, { payload }: PayloadAction<Partial<CartState>>) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

const cartApi = baseApi.enhanceEndpoints({ addTagTypes: ['cart-items', 'user-detail'] }).injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query<CartItemTransformedType[], void>({
      query: () => ({
        url: `api/carts`,
        method: 'GET',
      }),
      providesTags: ['cart-items'],
      transformResponse: (response: CartItemType[]) => {
        return response.map((item) => ({
          ...item,
          productMeta: item.productMeta[0],
        }));
      },
    }),
    addProductToCart: builder.mutation<void, { productMetaId: string[] }>({
      query: (data) => ({
        url: `api/carts`,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['cart-items', 'user-detail'],
    }),
    removeProductFromCart: builder.mutation<void, { productMetaId: string[] }>({
      query: (data) => ({
        url: `api/carts`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['cart-items', 'user-detail'],
    }),
  }),
});

export const { useGetCartItemsQuery, useAddProductToCartMutation, useRemoveProductFromCartMutation } = cartApi;

export const { setCartState } = cartSlice.actions;
