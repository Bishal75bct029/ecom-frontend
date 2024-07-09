import { SearchCard } from '@/components/organisms';
import { faker } from '@faker-js/faker';

import style from './style.module.scss';
import { Typography } from '@/components/atoms';

const randomData = (total: number) =>
  [...Array(total)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    image: faker.image.url(),
    rating: faker.number.float({ min: 1, max: 5 }),
    totalSold: faker.number.int({ min: 100, max: 500 }),
    price: parseInt(faker.commerce.price({ dec: 0 })),
    discount: faker.number.int({ min: 0, max: 100 }),
    totalRatings: faker.number.int({ min: 0, max: 200 }),
  }));

const data = randomData(10);

const SimilarProducts = () => {
  return (
    <>
      <Typography fontsStyle="large-semi-bold" className="mb-3">
        Disover Similar Products
      </Typography>

      <div className={style.cardsContainer}>
        {data.map(({ id, ...item }) => (
          <SearchCard key={id} to={`/${id}`} {...item} />
        ))}
      </div>
    </>
  );
};

export default SimilarProducts;
