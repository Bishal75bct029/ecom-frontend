import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://jsonplaceholder.typicode.com',
  prepareHeaders: (headers) => {
    // get token from localstorage and pass
    headers.set('Authorization', `Bearer token`);
    return headers;
  },
});

export const customFetchBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
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
