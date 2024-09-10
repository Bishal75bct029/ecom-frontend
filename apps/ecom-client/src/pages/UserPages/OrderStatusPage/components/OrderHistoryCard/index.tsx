import { FC } from 'react';
import { Typography } from '@/components/atoms';
import { OrderType } from '@/store/features/order/types';
import { formatDate } from '@/utils/date';
import style from './style.module.scss';
import { Stack } from 'react-bootstrap';
import config from '@/config';

const OrderHistoryCard: FC<{ orders: OrderType[] }> = ({ orders }) => {
  return (
    <>
      {orders.map((order, index) => {
        return (
          <div key={index} className={style.outerWrapper}>
            <div className={style.header}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <Typography fontsStyle="base-bold">Order: #{order.transaction.transactionId}</Typography>
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
              <div className="d-flex justify-content-between">
                <Typography color="silver-700" fontsStyle="small-regular">
                  Placed on {new Date(order.createdAt).toString().split('GMT')[0]}
                </Typography>
                <Typography color="silver-700" fontsStyle="small-regular">
                  {order.status.toLowerCase() === 'delivered'
                    ? `Delivered on  ${formatDate(new Date(order.updatedAt), false, 3)}`
                    : ` Delivery by ${formatDate(new Date(order.createdAt), false, 3)}`}
                </Typography>
              </div>
            </div>
            <Typography fontsStyle="base-semi-bold" className="mb-2">
              Order Items
            </Typography>
            <Stack className={style.wrapper}>
              {order.orderItems.map((orderItem, index) => {
                return (
                  <Stack direction="horizontal" key={index} className={style.itemWrapper}>
                    <Stack direction="horizontal" className={style.titleWrapper}>
                      <img src={orderItem.productMeta.image[0]} alt="" height={70} width={70} />
                      <div>
                        <Typography fontsStyle="base-bold" className="text-ellipsis-lh-2">
                          {orderItem.productMeta.product?.name}
                        </Typography>
                        <div className="d-flex flex-column gap-2 mt-2">
                          {Object.entries(orderItem.productMeta.variant).map(([key, val], i) => (
                            <Stack key={i} direction="horizontal">
                              <Typography fontsStyle="caption-normal" className="me-3">
                                {key}:{' '}
                                <Typography component={'span'} className="variantCard">
                                  {val}
                                </Typography>
                              </Typography>
                            </Stack>
                          ))}
                        </div>
                      </div>
                    </Stack>
                    <Stack direction="horizontal" className={style.quantityPriceWrapper}>
                      <Typography className="whitespace-nowrap">Qty: {orderItem.quantity}</Typography>
                      <Typography fontsStyle="base-bold" color="primary-purple" className="whitespace-nowrap">
                        {config.ecomCurrency} {orderItem.pricePerUnit.toLocaleString()}
                      </Typography>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
            <div>
              <Typography className={['d-flex justify-content-between', style.orderSummary].join(' ')}>
                <Typography fontsStyle="base-semi-bold">
                  Total ({order.orderItems.length} item{order.orderItems.length > 1 ? 's' : ''})
                </Typography>
                <Typography fontsStyle="base-bold" color="primary-purple">
                  {config.ecomCurrency} {(order.totalPrice / 100).toLocaleString()}
                </Typography>
              </Typography>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default OrderHistoryCard;
