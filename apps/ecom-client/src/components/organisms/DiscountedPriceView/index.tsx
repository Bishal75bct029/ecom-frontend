import { FC } from 'react';
import { Typography } from '@/components/atoms';
import config from '@/config';

interface DiscountedPriceViewProps {
  discountPrice: number;
  price: number;
  className?: string;
}

const DiscountedPriceView: FC<DiscountedPriceViewProps> = ({ discountPrice, price, className }) => {
  if (!discountPrice || discountPrice === price)
    return (
      <Typography fontsStyle="large-bold" color="primary-purple" className={className}>
        {config.ecomCurrency} {price.toLocaleString()}
      </Typography>
    );

  return (
    <Typography fontsStyle="large-bold" color="primary-purple" className={className}>
      {config.ecomCurrency} {discountPrice.toLocaleString()}
      <Typography component="span" fontsStyle="caption-normal" className="text-line-through ms-1" color="silver-500">
        {config.ecomCurrency} {price.toLocaleString()}
      </Typography>
    </Typography>
  );
};

export default DiscountedPriceView;
