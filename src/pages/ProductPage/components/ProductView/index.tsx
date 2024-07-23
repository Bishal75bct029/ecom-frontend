import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Stack } from 'react-bootstrap';
import { ImageCarousel, LoginForm } from '@/components/organisms';
import { Button, Modal, Typography } from '@/components/atoms';
import { useGetProductByIdQuery } from '@/store/features/product';
import style from './style.module.scss';
import { useAuth, useProductVariantSelection } from '@/hooks';
import { usePostLoginMutation } from '@/store/features/auth';

const ProductView = () => {
  const { productId } = useParams();

  const [quantity, setQuantity] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data: productData, isLoading } = useGetProductByIdQuery({ id: `${productId}` }, { skip: !productId });
  const [postLogin] = usePostLoginMutation();

  const { loginHandler } = useAuth();

  const {
    currentMeta,
    handleVariantClick,
    availableProductVariants,
    otherAvailableCombination,
    previousProductImages,
    selectedCombination,
  } = useProductVariantSelection(productData);

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
            <Button size="large" style={{ paddingInline: '72px' }} className="mt-4">
              Purchase
            </Button>
            <Button
              size="large"
              variant="tertiary"
              style={{ paddingInline: '72px' }}
              className="mt-4"
              onClick={() => setShowModal(true)}
            >
              Add to Cart
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Modal onHide={() => setShowModal(false)} show={showModal} fillBody>
        <LoginForm
          onSubmit={(payload) => postLogin(payload).unwrap().then(loginHandler)}
          wrapperClass="px-3 py-4"
          title="Welcome! Please login to continue."
        />
      </Modal>
    </>
  );
};

export default ProductView;
