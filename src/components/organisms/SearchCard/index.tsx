import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Stack } from 'react-bootstrap';

import style from './style.module.scss';
import { Typography } from '@/components/atoms';
// import StarRating from '../StarRating';
import { ProductType } from '@/store/features/product/types';

interface SearchCardProps extends ProductType {
  to: string;
}

const PriceView: FC<{ discountPrice: number; price: number }> = ({ discountPrice, price }) => {
  if (discountPrice === price)
    return (
      <Typography fontsStyle="large-bold" color="primary-purple">
        Rs. {price}
      </Typography>
    );

  return (
    <Typography fontsStyle="large-bold" color="primary-purple">
      Rs. {discountPrice}
      <Typography component="span" fontsStyle="caption-normal" className="text-line-through ms-1" color="silver-500">
        Rs. {price}
      </Typography>
    </Typography>
  );
};

const SearchCard: FC<SearchCardProps> = ({ to, name, productMeta }) => {
  const navigate = useNavigate();

  const defaultMeta = productMeta?.[0];

  if (!defaultMeta) return null;

  return (
    <Card onClick={() => navigate(to)} className={style.searchCard}>
      <div className={style.imgContainer}>
        <img src={defaultMeta?.image[0]} alt="laptop" />
      </div>
      <Stack className="px-3 mt-2 pb-3">
        <Typography className={style.searchItemName}>{name}</Typography>
        {/* <div className="d-flex gap-1">
          <StarRating initialValue={rating} size={18} readonly />
          <Typography color="silver-500" fontsStyle="caption-semi-bold" style={{ marginTop: '9px' }}>
            ({totalRatings})
          </Typography>
        </div> */}
        <Stack direction="horizontal" className="justify-content-between">
          <PriceView price={defaultMeta?.price} discountPrice={defaultMeta?.discountPrice} />
          {/* {totalSold > 0 && (
            <Typography color="silver-700" fontsStyle="caption-normal" className="mt-1">
              {totalSold} Sold
            </Typography>
          )} */}
        </Stack>
      </Stack>
    </Card>
  );
};

export default SearchCard;
