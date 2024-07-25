import { Stack } from 'react-bootstrap';
import { CheckoutDetail, CheckoutSummary } from './components';
import style from './style.module.scss';

const CheckoutPage = () => {
  return (
    <Stack direction="horizontal" className={style.checkoutContainer}>
      <CheckoutDetail />
      <CheckoutSummary />
    </Stack>
  );
};

export default CheckoutPage;
