import { RouteObject } from 'react-router-dom';

const privateRoutes: Omit<RouteObject, 'element' | 'index'>[] = [
  {
    path: 'private',
    lazy: async () => {
      const { Homepage } = await import('@/pages');
      return { Component: Homepage };
    },
  },
];

export default privateRoutes;
