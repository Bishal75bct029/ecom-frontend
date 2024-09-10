import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts';
import publicRoutes from './publicRoutes';
import privateRoutes from './privateRoutes';

export default createBrowserRouter([
  {
    element: <MainLayout privateRoutes={privateRoutes} />,
    children: [...publicRoutes, ...privateRoutes],
  },
]);
