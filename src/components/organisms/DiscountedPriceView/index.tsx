import { FC } from 'react';
import { Typography } from '@/components/atoms';

interface DiscountedPriceViewProps {
  discountPrice: number;
  price: number;
  className?: string;
}

const DiscountedPriceView: FC<DiscountedPriceViewProps> = ({ discountPrice, price, className }) => {
  if (!discountPrice || discountPrice === price)
    return (
      <Typography fontsStyle="large-bold" color="primary-purple" className={className}>
        Rs. {price}
      </Typography>
    );

  return (
    <Typography fontsStyle="large-bold" color="primary-purple" className={className}>
      Rs. {discountPrice}
      <Typography component="span" fontsStyle="caption-normal" className="text-line-through ms-1" color="silver-500">
        Rs. {price}
      </Typography>
    </Typography>
  );
};

export default DiscountedPriceView;
