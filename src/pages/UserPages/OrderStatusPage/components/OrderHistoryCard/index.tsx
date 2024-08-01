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
                          {orderItem.productMeta.product?.name} Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Nemo minus dicta totam earum. Nam doloremque earum a temporibus consectetur distinctio
                          eveniet atque id velit commodi quisquam odio eius aperiam, similique veritatis mollitia
                          laboriosam dolores repellendus maiores quidem cumque deleniti! Voluptatum qui quasi minima
                          pariatur vitae consequuntur saepe in! Omnis expedita eaque eos numquam neque nihil laborum.
                          Molestiae totam aliquid optio vel cum atque voluptatibus, nam repudiandae perspiciatis ipsam
                          itaque commodi aspernatur cumque labore unde quisquam consequuntur deleniti quaerat aut
                          veritatis, amet omnis harum. Numquam velit accusamus error, facere asperiores iusto excepturi
                          dignissimos, delectus blanditiis nihil, veniam vero? Iste, dolorem illum!
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
                        Rs {orderItem.pricePerUnit}
                      </Typography>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
            <Typography className={style.orderSummary} fontsStyle="base-semi-bold">
              Order Summary
            </Typography>
            <div>
              <Typography className="d-flex justify-content-between">
                <Typography>
                  Total ({order.orderItems.length} item{order.orderItems.length > 1 ? 's' : ''})
                </Typography>
                <Typography fontsStyle="base-bold" color="primary-purple">
                  Rs. {order.totalPrice / 100}
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
