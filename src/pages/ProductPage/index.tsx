import { ProductView, SimilarProducts, CustomerReview } from './components';

// const randomProductData = () => ({
//   id: faker.string.uuid(),
//   name: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae ex perspiciatis corrupti totam inventore, exercitationem iusto assumenda aliquid amet! Aspernatur perferendis velit quas qui quia totam nulla expedita perspiciatis unde?',
//   image: faker.image.url(),
//   rating: faker.number.float({ min: 1, max: 5 }),
//   totalSold: faker.number.int({ min: 100, max: 500 }),
//   price: parseInt(faker.commerce.price({ dec: 0 })),
//   discount: faker.number.int({ min: 0, max: 100 }),
//   totalRatings: faker.number.int({ min: 0, max: 200 }),
//   maxQuantity: faker.number.int({ min: 4, max: 7 }),
// });

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
