import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';

import style from './style.module.scss';
import { Button, Typography } from '@/components/atoms';
import { useGetProductByIdQuery } from '@/store/features/product';
import { OrderItemList } from '@/components/organisms';
import { TickLargeIcon } from '@/assets/icons';
import { useLazyConfirmOrderPaymentQuery } from '@/store/features/payment';
import { toastSuccess } from '@/utils';

const CompleteOrderPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data } = useGetProductByIdQuery({ id: '03f3fcde-a105-45fe-9aed-d1f18b879a9c' });
  const [confirmOrderPayment] = useLazyConfirmOrderPaymentQuery();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      navigate('/');
    } else {
      confirmOrderPayment({ token })
        .unwrap()
        .then(() => {
          setSearchParams({});
          toastSuccess('Payment Successful. Thank you!');
        });
    }
  }, []);

  if (!data) return null;

  const productData = { ...data, productMeta: data.productMeta[0] };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <Card className={style.completeOrderCard}>
        <div className="d-flex justify-content-between align-items-center">
          <Typography fontsStyle="large-semi-bold" className="d-flex align-items-center gap-2">
            <span className={style.tickContainer}>
              <TickLargeIcon />
            </span>
            Order Completed
          </Typography>
          <Button onClick={() => navigate('/')}>Continue Shopping</Button>
        </div>
        <hr className="p-0 mb-2" />
        <Typography fontsStyle="base-semi-bold" className="mb-3">
          Order Items
        </Typography>
        <OrderItemList items={[productData]} hideDiscount />
      </Card>
    </div>
  );
};

export default CompleteOrderPage;
