import { Container, Stack } from 'react-bootstrap';

import GlobalMstImage from '@/assets/icons/global-mst.svg';
import style from './style.module.scss';
import SearchBar from '../../../../components/organisms/SearchBar';
import { CartIcon, SignupIcon, UserIcon } from '@/assets/icons';

const Navbar = () => {
  return (
    <Container fluid className={style.navbar}>
      <Container fluid className={style.layout}>
        <div className={style.imageContainer}>
          <img src={GlobalMstImage} alt="logo" />
        </div>
        <SearchBar />
        <Stack direction="horizontal" className={style.rightContainer}>
          <Stack direction="horizontal" gap={3} className={style.loginContainer}>
            <div className="d-flex align-items-center gap-2">
              <UserIcon width={20} height={20} />
              Login
            </div>
            <div className={style.divider}>|</div>
            <div className="d-flex align-items-center gap-2">
              <SignupIcon width={18} height={18} /> Sign Up
            </div>
          </Stack>
          <div className={style.cartIcon}>
            <CartIcon />
          </div>
        </Stack>
      </Container>
    </Container>
  );
};

export default Navbar;
