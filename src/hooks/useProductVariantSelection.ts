import { useCallback, useEffect, useMemo, useState } from 'react';
import { isEqual } from 'lodash';
import { ProductType } from '@/store/features/product/types';

const useProductVariantSelection = (productData?: ProductType) => {
  const [selectedCombination, setSelectedCombination] = useState<Record<string, string>>();
  const [otherAvailableCombination, setOtherAvailableCombination] = useState<Record<string, string[]>>();
  const [previousProductImages, setPreviousProductImages] = useState<string[]>([]);

  const [availableProductVariants, availableCombinations] = useMemo(() => {
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
    setPreviousProductImages(defaultMeta?.image || []);

    return [attributeOptions, metaVariants];
  }, [productData]);

  //current selectedMeta
  const currentMeta = useMemo(() => {
    const variant = productData?.productMeta?.find((meta) => isEqual(meta.variant, selectedCombination));
    return variant;
  }, [selectedCombination, productData]);

  //onVariantClick
  const handleVariantClick = useCallback(
    (variantOption: string, variantValue: string) => {
      if (
        selectedCombination?.[variantOption] === variantValue ||
        (otherAvailableCombination &&
          otherAvailableCombination?.[variantOption] &&
          !otherAvailableCombination?.[variantOption]?.includes(variantValue))
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

      setOtherAvailableCombination(otherVariantsAvailableCombo);

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
    [availableCombinations, selectedCombination, otherAvailableCombination],
  );

  useEffect(() => {
    if (currentMeta) {
      setPreviousProductImages(currentMeta.image || []);
    }
  }, [currentMeta]);

  return {
    currentMeta,
    availableProductVariants,
    handleVariantClick,
    selectedCombination,
    otherAvailableCombination,
    previousProductImages,
  };
};

export default useProductVariantSelection;
