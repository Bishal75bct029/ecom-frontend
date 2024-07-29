import { FC } from 'react';
import { Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@/components/atoms';
import style from './style.module.scss';
import DiscountedPriceView from '../DiscountedPriceView';
import { CartItemTransformedType } from '@/store/features/cart/types';
import { useAppSelector } from '@/store/hooks';

interface OrderItemListProps {
  items: CartItemTransformedType[];
  hideDiscount?: boolean;
  priceClass?: string;
  enableProductRedirection?: boolean;
}

const OrderItemList: FC<OrderItemListProps> = ({ items, hideDiscount, priceClass, enableProductRedirection }) => {
  const navigate = useNavigate();
  const selectedProductQuantities = useAppSelector((state) => state.cart.selectedProductQuantities);

  return items.map((item, i) => (
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
              <Typography
                fontsStyle="base-semi-bold"
                className={['text-ellipsis-lh-1 mb-2 pb-1', enableProductRedirection && style.nameHover].join(' ')}
                onClick={() => {
                  enableProductRedirection && navigate(`/product/${item?.id}`);
                }}
              >
                {item?.name}
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
          <Stack className="me-5">
            <Typography fontsStyle="base-semi-bold" className={[style.quantityLabel].join(' ')}>
              Quantity
            </Typography>
            <Typography fontsStyle="base-semi-bold" className="d-flex justify-content-center mt-2">
              {selectedProductQuantities[item.productMeta.id]}
            </Typography>
          </Stack>
          <Stack>
            <Typography fontsStyle="base-semi-bold" className={[style.quantityLabel].join(' ')}>
              Price
            </Typography>
            <DiscountedPriceView
              discountPrice={hideDiscount ? 0 : item.productMeta.discountPrice}
              price={item?.productMeta.price}
              className={[style.quantityLabel, priceClass].join(' ')}
            />
          </Stack>
        </Stack>
      </Stack>
      <hr className={['p-0', i === items.length - 1 ? 'mb-0' : ''].join(' ')} />
    </div>
  ));
};

export default OrderItemList;
