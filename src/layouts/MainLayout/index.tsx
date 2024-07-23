import { FC, PropsWithChildren, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { Navigate, Outlet, RouteObject, useLocation } from 'react-router-dom';

import style from './style.module.scss';
import { Navbar } from './components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useLazyGetUserDetailQuery } from '@/store/features/auth';
import { setGlobalState } from '@/store/features/global';

interface MainLayoutProps extends PropsWithChildren {
  privateRoutes: Omit<RouteObject, 'element' | 'index'>[];
}

const MainLayout: FC<MainLayoutProps> = ({ children, privateRoutes }) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.global.user);

  const [getUserDetail, { isLoading, data, isError }] = useLazyGetUserDetailQuery();

  useEffect(() => {
    getUserDetail()
      .unwrap()
      .then((payload) => {
        dispatch(setGlobalState({ user: payload }));
      })
      .catch(() => {
        dispatch(setGlobalState({ user: undefined }));
      });
  }, [dispatch, getUserDetail]);

  if (isLoading || (!data && !isError)) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <Spinner />
      </div>
    );
  }

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
