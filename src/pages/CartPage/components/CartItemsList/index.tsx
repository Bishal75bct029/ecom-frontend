import { useCallback, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { differenceBy, uniqBy } from 'lodash';
import { Button, CheckBox, Typography } from '@/components/atoms';
import { setCartState, useGetCartItemsQuery, useRemoveProductFromCartMutation } from '@/store/features/cart';
import { CartItemType } from '@/store/features/cart/types';
import { DeleteIcon } from '@/assets/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toastSuccess } from '@/utils';
import style from './style.module.scss';
import { ConfirmationModal } from '@/components/molecules';

const CartItemsList = () => {
  const dispatch = useAppDispatch();

  const [selectedCartItem, setSelectedCartItem] = useState<string>('');

  const selectedCartProducts = useAppSelector((state) => state.cart.selectedCartProducts);
  const selectedProductQuantities = useAppSelector((state) => state.cart.selectedProductQuantities);

  const { data: cartItems } = useGetCartItemsQuery();
  const [removeProductFromCart] = useRemoveProductFromCartMutation();

  const handleSelectItem = useCallback(
    (items: CartItemType[]) => {
      const shouldMergeItems = items.some(
        (item) => !selectedCartProducts.find((selected) => selected.id === item.productMeta[0].id),
      );

      const newItems = shouldMergeItems
        ? uniqBy([...selectedCartProducts, ...items.map((item) => item.productMeta[0])], 'id')
        : differenceBy(
            selectedCartProducts,
            items.map((item) => item.productMeta[0]),
            'id',
          );

      const productQuantities = newItems.reduce<Record<string, number>>(
        (acc, item) => ({
          ...acc,
          [item.id]: selectedProductQuantities[item.id] || 1,
        }),
        {},
      );

      dispatch(setCartState({ selectedCartProducts: newItems, selectedProductQuantities: productQuantities }));
    },
    [selectedCartProducts, dispatch, selectedProductQuantities],
  );

  const onQuantityChange = useCallback(
    (id: string, operation: string) => {
      const currentQuantity = selectedProductQuantities[id] || 1;
      const newQuantity = operation === 'add' ? currentQuantity + 1 : Math.max(currentQuantity - 1, 1);

      dispatch(
        setCartState({
          selectedProductQuantities: {
            ...selectedProductQuantities,
            [id]: newQuantity,
          },
        }),
      );
    },
    [selectedProductQuantities, dispatch],
  );

  const handleRemoveItem = useCallback(
    (id: string) => {
      removeProductFromCart({ productMetaId: [id] })
        .unwrap()
        .then(() => {
          toastSuccess('Product removed from cart.');
        });
    },
    [removeProductFromCart],
  );
  return (
    <>
      <Stack className={style.cartItemsContainer}>
        <Typography fontsStyle="large-semi-bold">Shopping Cart</Typography>
        {!cartItems?.length && (
          <>
            <hr className="p-0 mt-0" />
            <div className="d-flex align-items-center justify-content-center h-100">
              <Typography color="secondary-red" fontsStyle="base-semi-bold">
                No items to show in the cart.
              </Typography>
            </div>
          </>
        )}
        {!!cartItems?.length && (
          <>
            <div className="d-flex justify-content-between mt-2">
              <Typography fontsStyle="base-semi-bold">
                <CheckBox
                  label={`${selectedCartProducts.length === cartItems?.length ? 'Deselect' : 'Select'} all items`}
                  checked={selectedCartProducts.length === cartItems?.length}
                  onChange={() => handleSelectItem(cartItems || [])}
                />
              </Typography>
              <Typography fontsStyle="base-semi-bold" color="primary-purple">
                Price
              </Typography>
            </div>
            <hr className="p-0 mt-0" />
            {cartItems?.map((item, i) => (
              <div key={i}>
                <Stack direction="horizontal" className={style.cartItem}>
                  <div className={style.productDetailContainer}>
                    <CheckBox
                      checked={selectedCartProducts.some((selectedItem) => selectedItem.id === item.productMeta[0].id)}
                      onChange={() => handleSelectItem([item])}
                    />
                    <div className="d-flex align-items-start gap-3">
                      <div>
                        <div className={style.imageContainer}>
                          <img src={item?.productMeta?.[0]?.image?.[0]} alt="image" />
                        </div>
                      </div>
                      <Stack>
                        <Typography fontsStyle="base-semi-bold" className={[style.productName, 'mb-2 pb-1'].join(' ')}>
                          {item.name}
                        </Typography>
                        <div className="d-flex flex-column gap-2">
                          {Object.entries(item.productMeta[0].variant).map(([key, val], i) => (
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
                        <Typography
                          color="secondary-red"
                          fontsStyle="small-regular"
                          className={style.deleteIcon}
                          onClick={() => setSelectedCartItem(item.productMeta[0].id)}
                        >
                          Remove <DeleteIcon />
                        </Typography>
                      </Stack>
                    </div>
                  </div>
                  <Stack direction="horizontal" className="align-items-start gap-4">
                    <div className="d-flex align-items-center">
                      <Typography fontsStyle="base-semi-bold" className={[style.quantityLabel, 'me-3'].join(' ')}>
                        Quantity
                      </Typography>
                      <Button
                        size="small"
                        variant="tertiary"
                        disabled={
                          !selectedProductQuantities[item.productMeta[0].id] ||
                          (!!selectedProductQuantities[item.productMeta[0].id] &&
                            selectedProductQuantities[item.productMeta[0].id] <= 1)
                        }
                        onClick={() => onQuantityChange(item.productMeta[0].id, 'subtract')}
                      >
                        -
                      </Button>
                      <Typography className="d-flex justify-content-center" style={{ width: '40px' }}>
                        {selectedProductQuantities[item.productMeta[0].id] || 1}
                      </Typography>
                      <Button
                        size="small"
                        variant="tertiary"
                        disabled={selectedProductQuantities[item.productMeta[0].id] >= item.productMeta[0].stock}
                        onClick={() => onQuantityChange(item.productMeta[0].id, 'add')}
                      >
                        +
                      </Button>
                    </div>
                    <Typography fontsStyle="large-bold" color="primary-purple" className={style.priceContainer}>
                      Rs. {item.productMeta[0]?.price}
                    </Typography>
                  </Stack>
                </Stack>
                <hr className={['p-0', i === cartItems.length - 1 ? 'mb-0' : ''].join(' ')} />
              </div>
            ))}
          </>
        )}
      </Stack>
      {!!selectedCartItem && (
        <ConfirmationModal
          show={!!selectedCartItem}
          title={
            <div className={style.confirmationModalTitle}>
              <DeleteIcon />
              Remove Cart Item
            </div>
          }
          confirmLabel="Remove"
          message="Are you sure you want to remove the cart item?"
          onHide={() => setSelectedCartItem('')}
          onConfirm={() => handleRemoveItem(selectedCartItem)}
        />
      )}
    </>
  );
};

export default CartItemsList;
