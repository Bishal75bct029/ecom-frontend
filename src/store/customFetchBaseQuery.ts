import config from '@/config';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: config.baseUrl,
  prepareHeaders: (headers) => {
    // get token from localstorage and pass
    headers.set('Authorization', `Bearer token`);
    return headers;
  },
  credentials: 'include',
  responseHandler: async (response) => {
    const res = await response.json();
    return res?.data;
  },
  paramsSerializer: (params) => {
    const query = Object.keys(params).map((key) => {
      if (!params[key]) return null;
      return [key, params[key]].map(encodeURIComponent).join('=');
    });
    return query.filter((item) => item).join('&');
  },
});

const customFetchBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  fetchArgs,
  api,
  extraOptions,
) => {
  if (typeof fetchArgs === 'object' && fetchArgs.body && fetchArgs.body instanceof FormData) {
    fetchArgs.headers = {
      ...fetchArgs.headers,
      'Content-Type': 'multipart/form-data',
    };
  }
  const baseQueryResult = await baseQuery(fetchArgs, api, extraOptions);

  if (baseQueryResult.error?.status === 401) {
    // Handle unauthorized requests
    // For now, just return the error
    return baseQueryResult;
  }

  return baseQueryResult;
};

export default customFetchBaseQuery;
