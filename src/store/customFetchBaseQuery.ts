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
  async responseHandler(response) {
    const res = await response.json();
    return res?.data;
  },
});

const customFetchBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  fetchArgs,
  api,
  extraOptions,
) => {
  const baseQueryResult = await baseQuery(fetchArgs, api, extraOptions);

  if (baseQueryResult.error?.status === 401) {
    // Handle unauthorized requests
    // For now, just return the error
    return baseQueryResult;
  }

  return baseQueryResult;
};

export default customFetchBaseQuery;
