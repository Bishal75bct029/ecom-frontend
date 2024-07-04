import { FC, PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import style from './style.module.scss';
import { Navbar } from './components';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
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
