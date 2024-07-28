import { useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CheckoutDetail, CheckoutSummary } from './components';
import style from './style.module.scss';
import { useAppSelector } from '@/store/hooks';
import { toastError } from '@/utils';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const selectedCartProducts = useAppSelector((state) => state.cart.selectedCartProducts);

  useEffect(() => {
    if (!selectedCartProducts.length) {
      console.log('hello');
      toastError('Please, select a product first.');
      navigate('/');
    }
  }, [selectedCartProducts]);

  return (
    <Stack direction="horizontal" className={style.checkoutContainer}>
      <CheckoutDetail />
      <CheckoutSummary />
    </Stack>
  );
};

export default CheckoutPage;
