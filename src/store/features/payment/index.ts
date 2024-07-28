import baseApi from '@/store/baseApi';
import { PaymentMethodType, PostOrderPayload } from './types';
// import { LoginPayload, LoginResponse } from './types';

export const paymentApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['payment-methods', 'user-detail', 'cart-items'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllPaymentMethods: builder.query<PaymentMethodType[], void>({
        query: () => ({
          url: `api/payment-methods`,
          method: 'GET',
        }),
        providesTags: ['payment-methods'],
      }),
      postOrder: builder.mutation<{ approvalUrl: string }, PostOrderPayload>({
        query: (data) => ({
          url: `api/orders`,
          method: 'POST',
          data,
        }),
        invalidatesTags: ['cart-items', 'user-detail'],
      }),
      confirmPayment: builder.query<void, { token: string }>({
        query: (params) => ({
          url: `api/transactions/capturePayment`,
          method: 'GET',
          params,
        }),
        keepUnusedDataFor: 0,
      }),
    }),
  });

export const { usePostOrderMutation, useGetAllPaymentMethodsQuery, useConfirmPaymentQuery } = paymentApi;
