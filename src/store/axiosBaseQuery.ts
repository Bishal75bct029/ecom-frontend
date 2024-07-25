import type { AxiosRequestConfig } from 'axios';
import { retry, type BaseQueryFn } from '@reduxjs/toolkit/query/react';

import { CustomAxiosError, axiosInstance } from '@/utils/axios';
import { errorMessageHandler } from '@/utils';

const baseQuery = (): BaseQueryFn<{
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
}> => {
  return async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
      });
      return { data: result };
    } catch (axiosError) {
      const err = axiosError as CustomAxiosError;

      errorMessageHandler(err, url);
      return {
        error: {
          status: err?.statusCode,
          data: err?.message,
        },
      };
    }
  };
};

const axiosBaseQuery = retry(baseQuery(), {
  retryCondition: (_, args, extraOptions) => {
    const { attempt } = extraOptions;
    const { method } = args;
    const condition = method.toLowerCase() === 'get' && attempt < 3;
    return condition;
  },
});

export default axiosBaseQuery;
