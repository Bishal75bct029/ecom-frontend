import { FC, PropsWithChildren, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate, Outlet, RouteObject, useLocation } from 'react-router-dom';

import style from './style.module.scss';
import { Navbar } from './components';
import { useAuth } from '@/hooks';
import { useAppSelector } from '@/store/hooks';

interface MainLayoutProps extends PropsWithChildren {
  privateRoutes: Omit<RouteObject, 'element' | 'index'>[];
}

const MainLayout: FC<MainLayoutProps> = ({ children, privateRoutes }) => {
  const { pathname } = useLocation();

  const { loginHandler } = useAuth();

  const user = useAppSelector((state) => state.global.user);

  useEffect(() => {
    loginHandler();
  }, []);

  if (privateRoutes.some((route) => pathname.includes(route.path as string)) && !user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />
      <Container fluid className={style.mainLayout}>
        {children ?? <Outlet key={Date.now()} />}
      </Container>
    </>
  );
};

export default MainLayout;
