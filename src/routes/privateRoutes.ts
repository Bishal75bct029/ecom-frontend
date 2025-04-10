import { RouteObject } from 'react-router-dom';

const privateRoutes: Omit<RouteObject, 'element' | 'index'>[] = [
  {
    path: 'cart',
    lazy: async () => {
      const { CartPage } = await import('@/pages');
      return { Component: CartPage };
    },
  },
  {
    path: 'checkout',
    lazy: async () => {
      const { CheckoutPage } = await import('@/pages');
      return { Component: CheckoutPage };
    },
  },
  {
    path: 'complete-order',
    lazy: async () => {
      const { CompleteOrderPage } = await import('@/pages');
      return { Component: CompleteOrderPage };
    },
  },
  {
    path: 'orders',
    lazy: async () => {
      const { OrderStatusPage } = await import('@/pages');
      return { Component: OrderStatusPage };
    },
  },
];

export default privateRoutes;
