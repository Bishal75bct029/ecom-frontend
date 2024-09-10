import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@/components/atoms';
import { SearchCard, SearchCardSkeleton } from '@/components/organisms';
import { useGetProductByCategoryQuery, useGetProductByIdQuery } from '@/store/features/product';
import style from './style.module.scss';

const SimilarProducts = () => {
  const { productId } = useParams();

  const { data: product } = useGetProductByIdQuery({ id: productId as string });

  const {
    data: similarProducts,
    isLoading,
    isFetching,
  } = useGetProductByCategoryQuery(
    {
      categoryId: `${product?.categories[product.categories.length - 1].id}`,
      productId: `${productId}`,
    },
    { skip: !product },
  );

  const loading = useMemo(() => isLoading || isFetching, [isLoading, isFetching]);

  return (
    <>
      <Typography fontsStyle="large-semi-bold" className="mb-3">
        Discover Similar Products
      </Typography>

      {loading && <SearchCardSkeleton count={5} />}

      {!loading && (
        <div className={style.cardsContainer}>
          {similarProducts?.map(({ id, ...item }) => <SearchCard key={id} to={`/product/${id}`} id={id} {...item} />)}
        </div>
      )}
    </>
  );
};

export default SimilarProducts;
