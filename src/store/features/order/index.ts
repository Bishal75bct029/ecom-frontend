import baseApi from '@/store/baseApi';
import { OrderType, PaymentMethodType, PostOrderPayload } from './types';

export const orderApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['payment-methods', 'user-detail', 'cart-items', 'orders'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllPaymentMethods: builder.query<PaymentMethodType[], void>({
        query: () => ({
          url: `api/payment-methods`,
          method: 'GET',
        }),
        providesTags: ['payment-methods'],
      }),
      getOrderList: builder.query<OrderType[], { status: string }>({
        query: (params) => ({
          url: `api/orders`,
          method: 'GET',
          params,
        }),
        providesTags: ['orders'],
      }),
      getOrderById: builder.query<OrderType, { id: string }>({
        query: ({ id }) => ({
          url: `api/orders/${id}`,
          method: 'GET',
        }),
        providesTags: (_, __, args) => [{ type: 'orders', id: args.id }],
      }),
      postOrder: builder.mutation<{ approvalUrl: string }, PostOrderPayload>({
        query: (data) => ({
          url: `api/orders`,
          method: 'POST',
          data,
        }),
        invalidatesTags: ['cart-items', 'user-detail'],
      }),
      confirmOrderPayment: builder.query<OrderType, { token: string }>({
        query: (params) => ({
          url: `api/orders/confirm`,
          method: 'GET',
          params,
        }),
        keepUnusedDataFor: 0,
      }),
    }),
  });

export const {
  usePostOrderMutation,
  useGetAllPaymentMethodsQuery,
  useLazyConfirmOrderPaymentQuery,
  useGetOrderByIdQuery,
  useLazyGetOrderByIdQuery,
  useGetOrderListQuery,
} = orderApi;
