import { useEffect, useState } from 'react';
import { Card, Spinner, Stack } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';

import style from './style.module.scss';
import { Button, Typography } from '@/components/atoms';
import { TickLargeIcon } from '@/assets/icons';
import { useLazyConfirmOrderPaymentQuery, useLazyGetOrderByIdQuery } from '@/store/features/order';
import { toastSuccess } from '@/utils';
import { DiscountedPriceView } from '@/components/organisms';
import { OrderType } from '@/store/features/order/types';

const CompleteOrderPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [orderDetails, setOrderDetails] = useState<OrderType>();

  const [getOrderDetails, { isLoading }] = useLazyGetOrderByIdQuery();
  const [confirmOrderPayment] = useLazyConfirmOrderPaymentQuery();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      navigate('/');
    } else {
      confirmOrderPayment({ token })
        .unwrap()
        .then(({ orderId }) => {
          getOrderDetails({ id: orderId })
            .unwrap()
            .then((data) => {
              setOrderDetails(data);
            });
          setSearchParams({});
          toastSuccess('Payment Successful. Thank you!');
        });
    }
  }, []);

  if (isLoading || !orderDetails)
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
        <Spinner />
      </div>
    );

  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
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
        {orderDetails?.orderItems.map((item, i) => (
          <div key={i}>
            <Stack direction="horizontal" className={style.orderItem}>
              <div className={style.productDetailContainer}>
                <div className="d-flex align-items-start gap-3">
                  <div>
                    <div className={style.imageContainer}>
                      <img src={item?.productMeta?.image[0]} alt="image" />
                    </div>
                  </div>
                  <Stack>
                    <Typography fontsStyle="base-semi-bold" className="text-ellipsis-lh-2 mb-2 pb-1">
                      {item?.productMeta.product.name}
                    </Typography>
                    <div className="d-flex flex-column gap-2">
                      {Object.entries(item.productMeta?.variant || {}).map(([key, val], i) => (
                        <Stack key={i} direction="horizontal">
                          <Typography fontsStyle="small-regular" className="me-3">
                            {key}:{' '}
                            <Typography component={'span'} className="variantCard">
                              {val}
                            </Typography>
                          </Typography>
                        </Stack>
                      ))}
                    </div>
                  </Stack>
                </div>
              </div>
              <Stack direction="horizontal" className="align-items-start" style={{ width: 'fit-content' }}>
                <Stack className="me-3">
                  <Typography fontsStyle="base-semi-bold" className={[style.quantityLabel].join(' ')}>
                    Quantity
                  </Typography>
                  <Typography fontsStyle="base-semi-bold" className="d-flex justify-content-center mt-2">
                    {item.quantity}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography fontsStyle="base-semi-bold" className={[style.quantityLabel].join(' ')}>
                    Price
                  </Typography>
                  <DiscountedPriceView
                    discountPrice={0}
                    price={item?.totalPrice / 100}
                    className={[
                      style.quantityLabel,
                      'd-flex flex-column align-items-center justify-content-center mt-1 pt-1',
                    ].join(' ')}
                  />
                </Stack>
              </Stack>
            </Stack>
            <hr className={['p-0', i === orderDetails?.orderItems.length - 1 ? 'mb-2' : ''].join(' ')} />
          </div>
        ))}
        <Typography fontsStyle="base-semi-bold">Order Summary</Typography>
        <Typography className="d-flex align-items-center justify-content-between">
          <span>Subtotal (item{orderDetails?.orderItems.length > 1 ? 's' : ''})</span>
          <Typography fontsStyle="large-bold" color="primary-purple">
            Rs. {orderDetails?.totalPrice / 100}
          </Typography>
        </Typography>
      </Card>
    </div>
  );
};

export default CompleteOrderPage;
