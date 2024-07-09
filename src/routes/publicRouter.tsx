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
        path: ':id',
        lazy: async () => {
          const { ProductPage } = await import('@/pages');
          return { Component: ProductPage };
        },
      },
    ],
  },
];
