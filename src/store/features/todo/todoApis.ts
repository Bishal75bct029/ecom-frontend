import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBaseQuery } from '@/store/customFetchBaseQuery';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: false;
};

export const todoApis = createApi({
  reducerPath: 'todoApis',
  baseQuery: customFetchBaseQuery,
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => ({
        url: `/todos`,
        method: 'GET',
      }),
    }),
    getTodo: builder.query<Todo, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'GET',
      }),
    }),
    postTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: `/todos`,
        method: 'POST',
        body: todo,
      }),
    }),
  }),
});

export const { useGetTodosQuery, useGetTodoQuery, usePostTodoMutation } = todoApis;
