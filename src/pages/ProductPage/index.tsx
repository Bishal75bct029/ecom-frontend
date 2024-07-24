import { ProductView, SimilarProducts, CustomerReview } from './components';

const ProductPage = () => {
  return (
    <>
      <ProductView />

      <hr className="mt-4 p-0" />

      <SimilarProducts />

      <hr className="mt-4 p-0" />

      <CustomerReview />
    </>
  );
};

export default ProductPage;
