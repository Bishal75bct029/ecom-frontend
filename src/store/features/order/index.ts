import baseApi from '@/store/baseApi';
import { OrderDetailsType } from './types';

export const paymentApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['order-status', 'order-detail', 'cart-items'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllOrders: builder.query<OrderDetailsType[], void>({
        query: () => ({
          url: `api/orders`,
          method: 'GET',
        }),
        providesTags: ['order-detail'],
      }),
    }),
  });

export const { useGetAllOrdersQuery } = paymentApi;
