import { useParams } from 'react-router-dom';
import { Breadcrumb } from '@/components/atoms';
import { ProductView, SimilarProducts } from './components';
import { useGetProductByIdQuery } from '@/store/features/product';

const ProductPage = () => {
  const { productId } = useParams();

  const { data } = useGetProductByIdQuery({ id: `${productId}` }, { skip: !productId });

  return (
    <>
      <Breadcrumb
        active={data ? data.name : 'Loading...'}
        items={[
          { label: 'Home', link: '/' },
          { label: 'Products', link: '/' },
        ]}
      />
      <ProductView />

      <hr className="mt-4 p-0" />

      <SimilarProducts />

      {/* <hr className="mt-4 p-0" />

      <CustomerReview /> */}
    </>
  );
};

export default ProductPage;
