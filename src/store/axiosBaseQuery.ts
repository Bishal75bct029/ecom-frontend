import type { AxiosRequestConfig } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';

import { CustomAxiosError, axiosInstance } from '@/utils/axios';
import { errorMessageHandler } from '@/utils';

const axiosBaseQuery = (): BaseQueryFn<{
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

      errorMessageHandler(err);
      return {
        error: {
          status: err?.statusCode,
          data: err?.message,
        },
      };
    }
  };
};

export default axiosBaseQuery;
