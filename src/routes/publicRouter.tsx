import { RouteObject } from 'react-router-dom';

export const publicRouter: RouteObject[] = [
  {
    path: '',
    async lazy() {
      const { Homepage } = await import('@/pages/HomePage');
      return { Component: Homepage };
    },
  },
];
