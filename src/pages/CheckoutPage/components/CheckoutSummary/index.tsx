import { useCallback, useMemo } from 'react';
import { Stack } from 'react-bootstrap';
import { Typography } from '@/components/atoms';
import { useAppSelector } from '@/store/hooks';
import { PaypalIcon } from '@/assets/icons';
import style from './style.module.scss';
import { useGetAllPaymentMethodsQuery, usePostOrderMutation } from '@/store/features/order';

const CheckoutSummary = () => {
  const selectedCartProducts = useAppSelector((state) => state.cart.selectedCartProducts);
  const selectedProductQuantities = useAppSelector((state) => state.cart.selectedProductQuantities);

  const { data: paymentMethods } = useGetAllPaymentMethodsQuery();
  const [postOrder, { isLoading }] = usePostOrderMutation();

  const productsTotalPrice = useMemo(
    () =>
      selectedCartProducts.reduce((acc, item) => {
        return acc + Number(item.productMeta.discountPrice) * selectedProductQuantities[item.productMeta.id];
      }, 0),
    [selectedCartProducts, selectedProductQuantities],
  );

  const onPaywithPaypal = useCallback(() => {
    const selectedPaymentMethod = paymentMethods?.find((method) => method.name === 'PAYPAL');
    if (!selectedPaymentMethod || !selectedCartProducts || !selectedProductQuantities) return;
    const productMetaIds = selectedCartProducts.map((item) => ({
      id: item.productMeta.id,
      quantity: selectedProductQuantities[item.productMeta.id],
    }));
    postOrder({ paymentMethodId: selectedPaymentMethod.id, productMetaIds })
      .unwrap()
      .then((res) => {
        window.location.href = res.approvalUrl;
      });
  }, [paymentMethods, selectedCartProducts, selectedProductQuantities]);

  return (
    <Stack style={{ width: '25%', height: 'fit-content' }}>
      <Typography fontsStyle="large-semi-bold">Checkout Summary</Typography>
      <hr className="p-0 mt-0" />
      <div className="d-flex flex-column gap-1 mb-3">
        <Typography className="d-flex justify-content-between">
          <span>Subtotal (item{selectedCartProducts.length > 1 ? 's' : ''})</span>
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
      <div className="d-flex justify-content-center mt-2">
        <div
          className={[isLoading ? style.disabled : '', style.customButton].join(' ')}
          onClick={() => {
            if (isLoading) return;
            onPaywithPaypal();
          }}
        >
          {isLoading ? (
            'Loading...'
          ) : (
            <>
              <span>Pay with</span> <PaypalIcon />
            </>
          )}
        </div>
      </div>
    </Stack>
  );
};

export default CheckoutSummary;
