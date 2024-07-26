import { FC, PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate, Outlet, RouteObject, useLocation } from 'react-router-dom';

import style from './style.module.scss';
import { Navbar } from './components';
import { useAppSelector } from '@/store/hooks';
import { Footer } from '@/components/organisms';

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
    <div className="d-flex flex-column justify-content-between" style={{ height: '100vh' }}>
      <div className="h-100">
        <Navbar />
        <Container fluid className={style.mainLayout}>
          {children ?? <Outlet />}
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
