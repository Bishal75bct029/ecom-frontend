import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner, Stack } from 'react-bootstrap';
import { ImageCarousel, LoginForm, SearchCard } from '@/components/organisms';
import { Button, CheckBox, Modal, Typography } from '@/components/atoms';
import { useGetProductByCategoryQuery, useGetProductByIdQuery } from '@/store/features/product';
import { useAuth, useProductVariantSelection } from '@/hooks';
import { usePostLoginMutation } from '@/store/features/auth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useAddProductToCartMutation } from '@/store/features/cart';
import { setGlobalState } from '@/store/features/global';
import style from './style.module.scss';

const ProductView = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState<number>(1);

  const user = useAppSelector((state) => state.global.user);
  const modalInView = useAppSelector((state) => state.global.modalInView);

  const { data: productData, isLoading } = useGetProductByIdQuery({ id: `${productId}` }, { skip: !productId });
  const { data: similarProducts } = useGetProductByCategoryQuery(
    {
      categoryId: `${productData?.categories[productData.categories.length - 1].id}`,
      productId: `${productId}`,
    },
    { skip: !productData },
  );
  const [postLogin] = usePostLoginMutation();
  const [addProductToCart, { isLoading: addToCartLoading }] = useAddProductToCartMutation();

  const { loginHandler } = useAuth();
  const {
    currentMeta,
    handleVariantClick,
    availableProductVariants,
    otherAvailableCombination,
    previousProductImages,
    selectedCombination,
  } = useProductVariantSelection(productData);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentMeta) return;
    if (!user) return setGlobalState({ modalInView: 'login' });
    return addProductToCart({ productMetaId: [currentMeta.id] })
      .unwrap()
      .then(() => {
        dispatch(setGlobalState({ modalInView: 'addToCart' }));
      });
  };

  console.log(modalInView);

  if (isLoading)
    return (
      <div className="d-flex align-items-center justify-content-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <Stack direction="horizontal" gap={3} className="align-items-start">
        <ImageCarousel size={400} images={currentMeta ? currentMeta?.image || [] : previousProductImages} />
        <Stack>
          {<Typography fontsStyle="large-semi-bold">{productData?.name}</Typography>}
          {/* <Stack direction="horizontal" gap={4}>
            <StarRating initialValue={productData.rating} readonly size={20} />
            <Typography fontsStyle="caption-semi-bold" color="primary-purple" className={style.totalRating}>
              {productData.totalRatings} Ratings
            </Typography>
          </Stack> */}
          <Typography fontsStyle="large-bold" color="primary-purple" className="mt-3 mb-2">
            Rs.{(currentMeta?.price || 0) * quantity}
          </Typography>
          <Typography fontsStyle="base-semi-bold">About this Item</Typography>
          <Typography>{productData?.description}</Typography>

          <div className="mb-2 mt-3 d-flex flex-column gap-3">
            <Typography fontsStyle="base-semi-bold">Select Variants:</Typography>
            {Object.entries(availableProductVariants).map(([key, arrayOfValues], i) => (
              <Stack key={i} direction="horizontal">
                <Typography fontsStyle="base-semi-bold" className="me-3">
                  {key}:
                </Typography>
                <div className="d-flex gap-2">
                  {arrayOfValues.map((val, i) => (
                    <div
                      key={i}
                      className={[
                        style.productVariantCard,
                        selectedCombination?.[key] === val ? style.selectedVariant : '',
                        otherAvailableCombination &&
                        otherAvailableCombination?.[key] &&
                        !otherAvailableCombination?.[key]?.includes(val)
                          ? style.disabledVariant
                          : '',
                      ].join(' ')}
                      onClick={() => handleVariantClick(key, val)}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              </Stack>
            ))}
          </div>
          <Stack direction="horizontal" className="align-items-center mt-3">
            <Typography fontsStyle="base-semi-bold" className="me-3">
              Quantity
            </Typography>
            <Button variant="tertiary" disabled={quantity <= 1} onClick={() => setQuantity(quantity - 1)}>
              -
            </Button>
            <Typography className="d-flex justify-content-center" style={{ width: '40px' }}>
              {quantity}
            </Typography>
            <Button
              variant="tertiary"
              disabled={quantity >= (currentMeta?.stock || 0)}
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </Stack>

          <Stack direction="horizontal" gap={3}>
            <Button size="large" style={{ paddingInline: '72px' }} className="mt-4" onClick={() => console.log('hi')}>
              Purchase
            </Button>
            <Button
              size="large"
              variant="tertiary"
              style={{ paddingInline: '72px' }}
              className="mt-4"
              onClick={handleAddToCart}
              disabled={addToCartLoading}
            >
              Add to Cart
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {modalInView === 'login' && (
        <Modal onHide={() => setGlobalState({ modalInView: false })} show={modalInView === 'login'} fillBody>
          <LoginForm
            onSubmit={(payload) => postLogin(payload).unwrap().then(loginHandler)}
            wrapperClass="px-3 py-4"
            title="Welcome! Please login to continue."
          />
        </Modal>
      )}
      {modalInView === 'addToCart' && (
        <Modal
          onHide={() => setGlobalState({ modalInView: false })}
          show={modalInView === 'addToCart'}
          fillBody
          size="lg"
        >
          <div className="px-4 py-4 overflow-x-hidden">
            <div className="d-flex justify-content-between align-items-center">
              <Typography fontsStyle="large-semi-bold" color="primary-teal" className="d-flex gap-2">
                <CheckBox checked isRadio /> 1 item added to cart successfully.
              </Typography>
              <Button
                size="large"
                onClick={() => {
                  dispatch(setGlobalState({ modalInView: false }));
                  navigate('/cart');
                }}
              >
                Go to Cart
              </Button>
            </div>
            <hr className="mb-0" />
            <Typography fontsStyle="large-semi-bold" className="mb-2">
              Similar products just for you
            </Typography>
            <div className={style.similarProductsContainer}>
              {similarProducts
                ?.slice(0, 3)
                .map(({ id, ...item }) => <SearchCard key={id} to={`/${id}`} id={id} {...item} />)}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProductView;
