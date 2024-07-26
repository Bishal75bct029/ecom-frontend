import { useEffect, useMemo, useState } from 'react';
import { Card, Stack } from 'react-bootstrap';
import { Button, Typography } from '@/components/atoms';
import { useGetUserAddressesQuery, useGetUserDetailQuery } from '@/store/features/user';
import style from './style.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import ChangeAddressModal from '../ChangeAddressModal';
import { setCartState } from '@/store/features/cart';
import { setStorageItem } from '@/utils';
import AddAddressModal from '../AddAddressModal';
import { DiscountedPriceView } from '@/components/organisms';

const CheckoutDetail = () => {
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState<string>('');

  const selectedCartProducts = useAppSelector((state) => state.cart.selectedCartProducts);
  const selectedProductQuantities = useAppSelector((state) => state.cart.selectedProductQuantities);
  const selectedShippingAddress = useAppSelector((state) => state.cart.selectedShippingAddress);

  const { data: userDetail } = useGetUserDetailQuery();
  const { data: userAddresses } = useGetUserAddressesQuery();

  const currentAddress = useMemo(() => {
    if (!selectedShippingAddress && userAddresses) {
      dispatch(setCartState({ selectedShippingAddress: userAddresses[0] }));
      return userAddresses?.[0];
    }
    return selectedShippingAddress;
  }, [userAddresses, selectedShippingAddress, dispatch]);

  useEffect(() => {
    //incase of reload in checkout page the data is saved in local storage
    window.addEventListener('beforeunload', () => {
      setStorageItem('selectedCartProducts', selectedCartProducts);
      setStorageItem('selectedProductQuantities', selectedProductQuantities);
    });

    return () => {
      window.removeEventListener('beforeunload', () => {});
    };
  }, []);

  return (
    <>
      <Stack className={style.checkoutDetailContainer}>
        <Typography fontsStyle="large-semi-bold">Checkout</Typography>
        <hr className="p-0 mt-0" />
        <Stack direction="horizontal" className="align-items-center justify-content-between mb-3">
          <Typography fontsStyle="base-semi-bold">Your Address</Typography>
          <Button variant="tertiary" size="small" onClick={() => setShowModal('addAddress')}>
            Add new address
          </Button>
        </Stack>
        <Card className={style.addressContainer}>
          <div className={style.leftAddressContainer}>
            <div>
              <Typography fontsStyle="small-regular">To</Typography>
              <Typography fontsStyle="small-bold" className={style.wordNoBreak}>
                {userDetail?.name}
              </Typography>
            </div>
            <div>
              <Typography fontsStyle="small-regular">Contact</Typography>
              <Typography fontsStyle="small-bold" className={style.wordNoBreak}>
                {currentAddress?.contact}
              </Typography>
            </div>
            <div className={style.address}>
              <Typography fontsStyle="small-regular">Address</Typography>
              <Typography fontsStyle="small-bold" className="text-ellipsis">
                {currentAddress?.name}
              </Typography>
            </div>
          </div>
          <div className={style.rightAddressContainer}>
            <Button size="small" onClick={() => setShowModal('editAddress')}>
              Edit address
            </Button>
            <Button size="small" onClick={() => setShowModal('changeAddress')}>
              Change address
            </Button>
          </div>
        </Card>
        <Typography fontsStyle="small-regular" className="mt-2">
          Email to:{' '}
          <Typography fontsStyle="small-bold" component={'span'}>
            {userDetail?.email}
          </Typography>
        </Typography>
        <hr className="p-0 mb-2" />
        <Stack>
          <Typography fontsStyle="base-semi-bold" className="mb-3">
            Checkout Items
          </Typography>
          {selectedCartProducts.map((item, i) => (
            <div key={i}>
              <Stack direction="horizontal" className={style.cartItem}>
                <div className={style.productDetailContainer}>
                  <div className="d-flex align-items-start gap-3">
                    <div>
                      <div className={style.imageContainer}>
                        <img src={item.productMeta.image[0]} alt="image" />
                      </div>
                    </div>
                    <Stack>
                      <Typography fontsStyle="base-semi-bold" className={[style.productName, 'mb-2 pb-1'].join(' ')}>
                        {item.name}
                      </Typography>
                      <div className="d-flex flex-column gap-2">
                        {Object.entries(item.productMeta.variant).map(([key, val], i) => (
                          <Stack key={i} direction="horizontal">
                            <Typography fontsStyle="small-regular" className="me-3">
                              {key}:{' '}
                              <Typography component={'span'} className={style.variantCard}>
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
                      discountPrice={item.productMeta.discountPrice}
                      price={item.productMeta.price}
                      className={[
                        style.quantityLabel,
                        'd-flex flex-column align-items-center justify-content-center mt-2',
                      ].join(' ')}
                    />
                  </Stack>
                </Stack>
              </Stack>
              <hr className={['p-0', i === selectedCartProducts.length - 1 ? 'mb-0' : ''].join(' ')} />
            </div>
          ))}
        </Stack>
      </Stack>
      {showModal === 'changeAddress' && (
        <ChangeAddressModal show={showModal === 'changeAddress'} onHide={() => setShowModal('')} />
      )}
      {['editAddress', 'addAddress'].includes(showModal) && (
        <AddAddressModal
          show={['editAddress', 'addAddress'].includes(showModal)}
          onHide={() => setShowModal('')}
          isEditMode={showModal === 'editAddress'}
        />
      )}
    </>
  );
};

export default CheckoutDetail;
