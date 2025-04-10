import { RouteObject } from 'react-router-dom';

const publicRoutes: Omit<RouteObject, 'element' | 'index'>[] = [
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
    path: 'product/:productId',
    lazy: async () => {
      const { ProductPage } = await import('@/pages');
      return { Component: ProductPage };
    },
  },
  {
    path: 'search',
    lazy: async () => {
      const { SearchPage } = await import('@/pages');
      return { Component: SearchPage };
    },
  },
];

export default publicRoutes;
