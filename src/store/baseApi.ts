import { createApi } from '@reduxjs/toolkit/query/react';

import customFetchBaseQuery from './customFetchBaseQuery';

const baseApi = createApi({
  reducerPath: 'baseApiReducer',
  baseQuery: customFetchBaseQuery,
  endpoints: () => ({}),
});

export default baseApi;
