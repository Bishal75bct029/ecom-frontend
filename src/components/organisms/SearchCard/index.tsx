import { Card, Stack } from 'react-bootstrap';

import style from './style.module.scss';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@/components/atoms';
import StarRating from '../StarRating';

interface SearchCardProps {
  to: string;
  name: string;
  totalSold: number;
  price: number;
  discount: number;
  rating: number;
  image: string;
  totalRatings: number;
}

const PriceView: FC<Pick<SearchCardProps, 'discount' | 'price'>> = ({ discount, price }) => {
  if (!discount)
    return (
      <Typography fontsStyle="large-bold" color="primary-purple">
        Rs. {price}
      </Typography>
    );

  const discountedPrice = Math.round(price - (price * discount) / 100);

  return (
    <Typography fontsStyle="large-bold" color="primary-purple">
      Rs. {discountedPrice}
      <Typography component="span" fontsStyle="caption-normal" className="text-line-through ms-1" color="silver-500">
        Rs. {price}
      </Typography>
    </Typography>
  );
};

const SearchCard: FC<SearchCardProps> = ({ to, name, totalSold, price, discount, rating, image, totalRatings }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(to)} className={style.searchCard}>
      <div className={style.imgContainer}>
        <img src={image} alt="laptop" />
      </div>
      <Stack className="px-3 mt-2 pb-3">
        <Typography className={style.searchItemName}>{name}</Typography>
        <div className="d-flex gap-1">
          <StarRating initialValue={rating} size={18} readonly />
          <Typography color="silver-500" fontsStyle="caption-semi-bold" style={{ marginTop: '9px' }}>
            ({totalRatings})
          </Typography>
        </div>
        <Stack direction="horizontal" className="justify-content-between">
          <PriceView {...{ discount, price }} />
          {totalSold > 0 && (
            <Typography color="silver-700" fontsStyle="caption-normal" className="mt-1">
              {totalSold} Sold
            </Typography>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default SearchCard;
