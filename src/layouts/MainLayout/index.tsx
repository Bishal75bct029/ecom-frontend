import { FC, PropsWithChildren, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import style from './style.module.scss';
import { Navbar } from './components';
import { useLazyGetUserDetailQuery } from '@/store/features/auth';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const [getUserDetail] = useLazyGetUserDetailQuery();

  useEffect(() => {
    getUserDetail();
  }, [getUserDetail]);

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
