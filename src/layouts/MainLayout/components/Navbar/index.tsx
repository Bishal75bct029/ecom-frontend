import { Container, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import GlobalMstImage from '@/assets/icons/global-mst.svg';
import style from './style.module.scss';
import SearchBar from '../../../../components/organisms/SearchBar';
import { CartIcon, UserIcon } from '@/assets/icons';
import { useGetUserDetailQuery } from '@/store/features/auth';
import { Typography } from '@/components/atoms';
import Categories from '../Categories';

const Navbar = () => {
  const navigate = useNavigate();
  const { data: userDetail } = useGetUserDetailQuery();

  return (
    <Container fluid className={style.navbar}>
      <Container fluid className={style.layout}>
        <div className={style.imageContainer} onClick={() => navigate('/')}>
          <img src={GlobalMstImage} alt="logo" />
        </div>
        <div className={style.categoriesContainer}>
          <Typography className={style.categoryText}>Categories</Typography>
          <div className={style.categories}>
            <Categories />
          </div>
        </div>
        <SearchBar />
        <Stack direction="horizontal" className={style.rightContainer}>
          <Stack direction="horizontal" gap={3} className={style.loginContainer}>
            <div className="d-flex align-items-center gap-2 cursor-pointer" onClick={() => navigate('/login')}>
              <UserIcon width={20} height={20} />
              Login
            </div>
            {/* <div className={style.divider}>|</div>
            <div className="d-flex align-items-center gap-2">
              <SignupIcon width={18} height={18} /> Sign Up
            </div> */}
          </Stack>
          <div className={[style.cartIconContainer, 'cursor-pointer'].join(' ')} onClick={() => navigate('/cart')}>
            <CartIcon />
            {(userDetail?.cart?.productMetaId?.length || 0) > 0 && (
              <div className={style.cartCount}>{userDetail?.cart?.productMetaId?.length || 0}</div>
            )}
          </div>
        </Stack>
      </Container>
    </Container>
  );
};

export default Navbar;
