import { useMemo } from 'react';
import { Button, Typography } from '@/components/atoms';
import { useAppSelector } from '@/store/hooks';

const CartSummary = () => {
  const selectedCartProducts = useAppSelector((state) => state.cart.selectedCartProducts);
  const selectedProductQuantities = useAppSelector((state) => state.cart.selectedProductQuantities);

  const totalPrice = useMemo(
    () =>
      selectedCartProducts.reduce((acc, item) => {
        return acc + Number(item.price) * selectedProductQuantities[item.id];
      }, 0),
    [selectedCartProducts, selectedProductQuantities],
  );

  return (
    <div style={{ width: '20%' }}>
      <Typography fontsStyle="large-semi-bold">Order Summary</Typography>
      <hr className="p-0 mt-0" />
      {!!selectedCartProducts.length && (
        <div className="mb-3">
          <Typography className="d-flex justify-content-between">
            <span>
              Subtotal ({selectedCartProducts.length} item{selectedCartProducts.length > 1 ? 's' : ''})
            </span>
            <Typography fontsStyle="base-bold" color="primary-purple">
              Rs. {totalPrice}
            </Typography>
          </Typography>
        </div>
      )}
      {!selectedCartProducts.length && (
        <Typography className="d-flex justify-content-center mb-3" color="secondary-red" fontsStyle="base-semi-bold">
          No items selected.
        </Typography>
      )}
      <div className="d-flex justify-content-center">
        <Button disabled={!selectedCartProducts.length}>Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default CartSummary;
