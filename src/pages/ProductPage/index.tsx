import { faker } from '@faker-js/faker';
import { Stack } from 'react-bootstrap';
import { ImageCarousel, StarRating } from '@/components/organisms';
import { Button, Typography } from '@/components/atoms';
import style from './style.module.scss';
import CustomerReview from './components/CustomerReview';
import { useState } from 'react';
import SimilarProducts from './components/SimilarProducts';

const randomData = (total: number) => [...Array(total)].map(() => faker.image.url());

const data = randomData(20);

const randomProductData = () => ({
  id: faker.string.uuid(),
  name: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae ex perspiciatis corrupti totam inventore, exercitationem iusto assumenda aliquid amet! Aspernatur perferendis velit quas qui quia totam nulla expedita perspiciatis unde?',
  image: faker.image.url(),
  rating: faker.number.float({ min: 1, max: 5 }),
  totalSold: faker.number.int({ min: 100, max: 500 }),
  price: parseInt(faker.commerce.price({ dec: 0 })),
  discount: faker.number.int({ min: 0, max: 100 }),
  totalRatings: faker.number.int({ min: 0, max: 200 }),
  maxQuantity: faker.number.int({ min: 4, max: 7 }),
});

const productData = randomProductData();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const variants = [
  {
    name: 'Product 1',
    description: 'sdfsdf',
    category: ['a', 'b', 'c'],
    variantType: ['size', 'color'],
    variantOptions: { size: ['M', 'L', 'XL'], color: ['blue & black', 'red & black'] },
    productMeta: [
      {
        price: 10,
        sku: 1232,
        isDefault: true,
        images: [],
        variants: { size: 'M', color: 'blue & black' },
      },
      {
        price: 10,
        sku: 1232,
        isDefault: false,
        images: [],
        variants: { size: 'L', color: 'blue & black' },
      },
    ],
  },
  {
    name: 'variant 1',
    description: 'sdfsdf',
  },
];

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <Stack direction="horizontal" gap={3} className="align-items-start">
        <ImageCarousel images={data} />
        <Stack>
          {<Typography fontsStyle="large-semi-bold">{productData.name}</Typography>}
          <Stack direction="horizontal" gap={4}>
            <StarRating initialValue={productData.rating} readonly size={20} />
            <Typography fontsStyle="caption-semi-bold" color="primary-purple" className={style.totalRating}>
              {productData.totalRatings} Ratings
            </Typography>
          </Stack>
          <Typography fontsStyle="large-bold" color="primary-purple" className="mt-3 mb-2">
            Rs.{productData.price}
          </Typography>
          <Typography fontsStyle="base-semi-bold">About this Item</Typography>
          <Typography>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident quam dicta, dolorem sint ab ad eum
            nesciunt saepe, reiciendis eaque quo corporis non architecto ipsum odit obcaecati alias dolore modi. Aliquam
            libero hic dolorum numquam, tempore sit, fuga, eos aperiam amet sed enim quas ad officiis. Natus, voluptates
            temporibus unde ex ea asperiores in odit fuga? Aut obcaecati voluptate architecto, sint placeat explicabo
            perspiciatis eligendi! Labore aliquam corrupti eligendi architecto tempora voluptates quidem. Tempore, velit
            est? Laborum nemo culpa sint tenetur ullam repellendus excepturi quaerat sequi animi vero nam iusto, commodi
            qui necessitatibus voluptatibus. Rerum fugiat aut adipisci sunt ducimus.
          </Typography>

          <Stack direction="horizontal" className="my-3 align-items-center">
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
              disabled={quantity >= productData.maxQuantity}
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

      <hr className="mt-4 p-0" />

      <SimilarProducts />

      <hr className="mt-4 p-0" />

      <CustomerReview />
    </>
  );
};

export default ProductPage;
