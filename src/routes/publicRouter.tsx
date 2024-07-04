import MainLayout from '@/layouts/MainLayout';
import { RouteObject } from 'react-router-dom';

export const publicRouter: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '',
        lazy: async () => {
          const { Homepage } = await import('@/pages/HomePage');
          return { Component: Homepage };
        },
      },
    ],
  },
];
