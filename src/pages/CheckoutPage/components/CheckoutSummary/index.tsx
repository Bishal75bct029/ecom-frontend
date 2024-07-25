import { useMemo } from 'react';
import { Stack } from 'react-bootstrap';
import { Button, Typography } from '@/components/atoms';
import { useAppSelector } from '@/store/hooks';

const CheckoutSummary = () => {
  const selectedCartProducts = useAppSelector((state) => state.cart.selectedCartProducts);
  const selectedProductQuantities = useAppSelector((state) => state.cart.selectedProductQuantities);

  const productsTotalPrice = useMemo(
    () =>
      selectedCartProducts.reduce((acc, item) => {
        return acc + Number(item.productMeta.price) * selectedProductQuantities[item.productMeta.id];
      }, 0),
    [selectedCartProducts, selectedProductQuantities],
  );

  return (
    <Stack style={{ width: '25%', height: 'fit-content' }}>
      <Typography fontsStyle="large-semi-bold">Checkout Summary</Typography>
      <hr className="p-0 mt-0" />
      <div className="d-flex flex-column gap-1 mb-3">
        <Typography className="d-flex justify-content-between">
          <span>Subtotal (items)</span>
          <Typography fontsStyle="base-bold" color="primary-purple">
            Rs. {productsTotalPrice}
          </Typography>
        </Typography>
        {/* <Typography className="d-flex justify-content-between">
          <span>Shipping Fee</span>
          <Typography fontsStyle="base-bold" color="primary-purple">
            Rs. 50
          </Typography>
        </Typography>
        <Typography className="d-flex justify-content-between">
          <span>Total Fee</span>
          <Typography fontsStyle="base-bold" color="primary-purple">
            Rs. 5050
          </Typography>
        </Typography> */}
      </div>
      <div className="d-flex justify-content-center">
        <Button>Place Order</Button>
      </div>
    </Stack>
  );
};

export default CheckoutSummary;
