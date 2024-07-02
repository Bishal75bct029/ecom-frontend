import { RouteObject } from 'react-router-dom';

export const privateRouter: RouteObject[] = [
  {
    path: '/order/:id/checkout',
    children: [
      {
        path: 'team',
      },
    ],
  },
];
