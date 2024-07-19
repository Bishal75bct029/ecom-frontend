import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Stack } from 'react-bootstrap';
import { ImageCarousel } from '@/components/organisms';
import { Button, Typography } from '@/components/atoms';
import { useGetProductByIdQuery } from '@/store/features/product';
import style from './style.module.scss';

const ProductView = () => {
  const { productId } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [selectedCombination, setSelectedCombination] = useState<Record<string, string>>();
  const [otherAvailableCombo, setOtherAvailableCombo] = useState<Record<string, string[]>>();
  const [prevImages, setPrevImages] = useState<string[]>([]);

  const { data: productData, isLoading } = useGetProductByIdQuery({ id: `${productId}` }, { skip: !productId });

  const [defaultMeta, availableProductVariants, availableCombinations] = useMemo(() => {
    const { attributeOptions, metaVariants } = (productData?.productMeta || []).reduce<{
      attributeOptions: Record<string, string[]>;
      metaVariants: Record<string, string>[];
    }>(
      (acc, meta) => {
        Object.keys(meta.variant).forEach((key) => {
          if (!acc.attributeOptions[key]) {
            acc.attributeOptions[key] = [];
          }
          acc.attributeOptions[key] = [...new Set([...acc.attributeOptions[key], meta.variant[key]])];
        });
        acc.metaVariants.push(meta.variant);
        return acc;
      },
      { attributeOptions: {}, metaVariants: [] },
    );

    const defaultMeta = productData?.productMeta.find((meta) => meta.isDefault);

    setSelectedCombination(defaultMeta?.variant);
    setPrevImages(defaultMeta?.image || []);

    return [defaultMeta, attributeOptions, metaVariants];
  }, [productData]);

  const currentMeta = useMemo(() => {
    const variant = productData?.productMeta?.find(
      (meta) => JSON.stringify(meta.variant) === JSON.stringify(selectedCombination),
    );
    return variant;
  }, [selectedCombination, productData]);

  const handleVariantClick = useCallback(
    (variantOption: string, variantValue: string) => {
      if (
        selectedCombination?.[variantOption] === variantValue ||
        (otherAvailableCombo &&
          otherAvailableCombo?.[variantOption] &&
          !otherAvailableCombo?.[variantOption]?.includes(variantValue))
      )
        return;

      const otherVariantsAvailableCombo = availableCombinations?.reduce<Record<string, string[]>>(
        (acc, combination) => {
          if (combination[variantOption] === variantValue) {
            Object.keys(combination).forEach((key) => {
              if (key !== variantOption) {
                acc[key] = acc[key] ? [...acc[key], combination[key]] : [combination[key]];
              }
            });
          }
          return acc;
        },
        {},
      );

      setOtherAvailableCombo(otherVariantsAvailableCombo);

      setSelectedCombination((prev) => {
        const previous = { ...prev };
        Object.keys(otherVariantsAvailableCombo || {}).forEach((key) => {
          if (previous && key in previous && !otherVariantsAvailableCombo?.[key].includes(previous[key])) {
            previous[key] = '';
          }
        });
        return {
          ...previous,
          [variantOption]: variantValue,
        };
      });
    },
    [availableCombinations, selectedCombination, otherAvailableCombo],
  );

  if (isLoading)
    return (
      <div className="d-flex align-items-center justify-content-center">
        <Spinner />
      </div>
    );

  return (
    <Stack direction="horizontal" gap={3} className="align-items-start">
      <ImageCarousel size={400} images={currentMeta ? currentMeta?.image || [] : prevImages} />
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
                      otherAvailableCombo && otherAvailableCombo?.[key] && !otherAvailableCombo?.[key]?.includes(val)
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
            disabled={quantity >= (defaultMeta?.stock || 0)}
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>
        </Stack>

        <Stack direction="horizontal" gap={3}>
          <Button size="large" style={{ paddingInline: '72px' }} className="mt-4">
            Purchase
          </Button>
          <Button size="large" variant="tertiary" style={{ paddingInline: '72px' }} className="mt-4">
            Add to Cart
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductView;
