import { FC, PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate, Outlet, RouteObject, useLocation } from 'react-router-dom';

import style from './style.module.scss';
import { Navbar, Footer } from './components';
import { getStorageItem } from '@/utils';

interface MainLayoutProps extends PropsWithChildren {
  privateRoutes: Omit<RouteObject, 'element' | 'index'>[];
}

const MainLayout: FC<MainLayoutProps> = ({ children, privateRoutes }) => {
  const { pathname } = useLocation();
  const token = getStorageItem<string>('token');

  if (privateRoutes.some((route) => pathname.includes(route.path as string)) && !token) {
    return <Navigate to="/" />;
  }

  if (token && pathname.includes('login')) return <Navigate to="/" />;
  return (
    <div className="d-flex flex-column justify-content-between" style={{ minHeight: '100vh' }}>
      <div className="h-100">
        <Navbar />
        <Container fluid className={style.mainLayout} style={{ height: '80%' }}>
          {children ?? <Outlet />}
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
