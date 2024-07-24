import { Spinner, Stack } from 'react-bootstrap';

import style from './style.module.scss';
import { useGetCartItemsQuery } from '@/store/features/cart';
import { CartItemsList, CartSummary } from './components';

const CartPage = () => {
  const { isLoading } = useGetCartItemsQuery();

  if (isLoading) {
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Spinner />
    </div>;
  }

  return (
    <Stack direction="horizontal" className={style.cartContainer}>
      <CartItemsList />
      <CartSummary />
    </Stack>
  );
};

export default CartPage;
