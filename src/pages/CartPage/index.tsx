import { Spinner, Stack } from 'react-bootstrap';

import style from './style.module.scss';
import { useGetCartItemsQuery } from '@/store/features/cart';
import { CartItemsList, CartSummary } from './components';
import { Breadcrumb } from '@/components/atoms';

const CartPage = () => {
  const { isLoading, isFetching } = useGetCartItemsQuery();

  if (isLoading || isFetching) {
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Spinner />
    </div>;
  }

  return (
    <>
      <Breadcrumb active="Cart" items={[{ label: 'Home', link: '/' }]} />
      <Stack direction="horizontal" className={style.cartContainer}>
        <CartItemsList />
        <CartSummary />
      </Stack>
    </>
  );
};

export default CartPage;
