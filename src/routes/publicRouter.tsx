import MainLayout from '@/layouts/MainLayout';
import { RouteObject } from 'react-router-dom';

export const publicRouter: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '',
        lazy: async () => {
          const { Homepage } = await import('@/pages');
          return { Component: Homepage };
        },
      },
      {
        path: 'login',
        lazy: async () => {
          const { LoginPage } = await import('@/pages/AuthPages');
          return { Component: LoginPage };
        },
      },
      {
        path: ':productId',
        lazy: async () => {
          const { ProductPage } = await import('@/pages');
          return { Component: ProductPage };
        },
      },
    ],
  },
];
