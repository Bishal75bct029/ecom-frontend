import { FC } from 'react';
import { Typography } from '@/components/atoms';
import { OrderType } from '@/store/features/order/types';
import { formatDate } from '@/utils/date';
import style from './style.module.scss';
import { Stack } from 'react-bootstrap';

const OrderHistoryCard: FC<{ orders: OrderType[] }> = ({ orders }) => {
  return (
    <>
      {orders.map((order, index) => {
        return (
          <div key={index} className={style.outerWrapper}>
            <div className={style.header}>
              <Typography fontsStyle="base-bold">Order: #{order.id}</Typography>
              <Typography color="silver-700" fontsStyle="small-regular">
                Placed on {new Date(order.createdAt).toString().split('GMT')[0]}
              </Typography>
            </div>
            <div className={style.wrapper}>
              {order.orderItems.map((orderItem, index) => {
                return (
                  <div key={index}>
                    <div className={style.cardWrapper}>
                      <Stack direction="horizontal" className={style.titleWrapper}>
                        <img src={orderItem.productMeta.image[0]} alt="" height={50} width={50} />

                        <Typography fontsStyle="base-bold">{orderItem.productMeta.product?.name}</Typography>
                      </Stack>
                      <div className="d-flex gap-3">
                        <Typography>Qty: {orderItem.quantity}</Typography>
                        <Typography fontsStyle="base-bold" color="primary-purple">
                          Rs {orderItem.pricePerUnit}
                        </Typography>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <Typography
                className={style.orderStatus}
                fontsStyle="caption-normal"
                style={{
                  backgroundColor: order.status.toLowerCase() === 'delivered' ? '#e2eeff' : '#fde5e8',
                }}
              >
                {' '}
                {order.status}
              </Typography>
            </div>
            <Typography fontsStyle="base-bold" className={style.delivery}>
              {order.status.toLowerCase() === 'delivered'
                ? `Delivered on  ${formatDate(new Date(order.updatedAt), false, 3)}`
                : ` Delivery by ${formatDate(new Date(order.createdAt), false, 3)}`}
            </Typography>
          </div>
        );
      })}
    </>
  );
};

export default OrderHistoryCard;
