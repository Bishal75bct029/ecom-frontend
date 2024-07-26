import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { Typography } from '@/components/atoms';
import { SearchCard } from '@/components/organisms';
import { useGetProductByCategoryQuery, useGetProductByIdQuery } from '@/store/features/product';
import style from './style.module.scss';

const SimilarProducts = () => {
  const { productId } = useParams();

  const { data: product } = useGetProductByIdQuery({ id: productId as string });

  const { data: similarProducts, isLoading } = useGetProductByCategoryQuery(
    {
      categoryId: `${product?.categories[product.categories.length - 1].id}`,
      productId: `${productId}`,
    },
    { skip: !product },
  );

  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Typography fontsStyle="large-semi-bold" className="mb-3">
        Discover Similar Products
      </Typography>

      <div className={style.cardsContainer}>
        {similarProducts?.map(({ id, ...item }) => <SearchCard key={id} to={`/${id}`} id={id} {...item} />)}
      </div>
    </>
  );
};

export default SimilarProducts;
