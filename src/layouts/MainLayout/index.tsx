import { FC, PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate, Outlet, RouteObject, useLocation } from 'react-router-dom';

import style from './style.module.scss';
import { Navbar } from './components';
import { useAppSelector } from '@/store/hooks';

interface MainLayoutProps extends PropsWithChildren {
  privateRoutes: Omit<RouteObject, 'element' | 'index'>[];
}

const MainLayout: FC<MainLayoutProps> = ({ children, privateRoutes }) => {
  const { pathname } = useLocation();
  const token = useAppSelector((state) => state.user.token);

  if (privateRoutes.some((route) => pathname.includes(route.path as string)) && !token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />
      <Container fluid className={style.mainLayout}>
        {children ?? <Outlet />}
      </Container>
    </>
  );
};

export default MainLayout;
