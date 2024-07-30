import { FC, PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate, Outlet, RouteObject, useLocation } from 'react-router-dom';

import style from './style.module.scss';
import { Navbar, Footer } from './components';
import { FOOTER_INCLUDE_ROUTES } from '@/constants';
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

  return (
    <div className="d-flex flex-column justify-content-between" style={{ minHeight: '100vh' }}>
      <div className="h-100">
        <Navbar />
        <Container
          fluid
          className={style.mainLayout}
          style={{ height: FOOTER_INCLUDE_ROUTES.includes(pathname) ? '80%' : '100%' }}
        >
          {children ?? <Outlet />}
        </Container>
      </div>
      {FOOTER_INCLUDE_ROUTES.includes(pathname) && <Footer />}
    </div>
  );
};

export default MainLayout;
