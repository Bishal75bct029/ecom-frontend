import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@/components/atoms';
import { useAppSelector } from '@/store/hooks';
import { useGetCartItemsQuery } from '@/store/features/cart';
import { Spinner } from 'react-bootstrap';
import config from '@/config';

const CartSummary = () => {
  const navigate = useNavigate();

  const selectedCartProducts = useAppSelector((state) => state.cart.selectedCartProducts);
  const selectedProductQuantities = useAppSelector((state) => state.cart.selectedProductQuantities);

  const { isLoading, isFetching } = useGetCartItemsQuery();

  const totalPrice = useMemo(
    () =>
      selectedCartProducts.reduce((acc, item) => {
        return acc + Number(item.productMeta.discountPrice) * 100 * selectedProductQuantities[item.productMeta.id];
      }, 0),
    [selectedCartProducts, selectedProductQuantities],
  );

  const loading = useMemo(() => isLoading || isFetching, [isLoading, isFetching]);

  return (
    <div style={{ width: '25%' }}>
      <Typography fontsStyle="large-semi-bold">Order Summary</Typography>
      <hr className="p-0 mt-0" />
      {loading && (
        <div className="d-flex align-items-center justify-content-center" style={{ height: '165px' }}>
          <Spinner />
        </div>
      )}
      {!loading && !!selectedCartProducts.length && (
        <div className="mb-3">
          <Typography className="d-flex justify-content-between">
            <span>
              Subtotal ({selectedCartProducts.length} item{selectedCartProducts.length > 1 ? 's' : ''})
            </span>
            <Typography fontsStyle="base-bold" color="primary-purple">
              {config.ecomCurrency} {(totalPrice / 100).toLocaleString()}
            </Typography>
          </Typography>
        </div>
      )}
      {!loading && !selectedCartProducts.length && (
        <Typography className="d-flex justify-content-center mb-3" color="secondary-red" fontsStyle="base-semi-bold">
          No items selected.
        </Typography>
      )}
      <div className="d-flex justify-content-center">
        <Button disabled={!selectedCartProducts.length} onClick={() => navigate('/checkout')}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
