import { useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import Select from 'react-select';
import { ProgressBar, Stack } from 'react-bootstrap';
import { CustomPagination, Typography } from '@/components/atoms';
import { StarRating } from '@/components/organisms';
import style from './style.module.scss';
// import { SortIcon } from '@/assets/icons';

const randomRatings = (total: number) => [...Array(total)].map(() => faker.number.int({ min: 1, max: 5 }));

const ratings = randomRatings(160);

const getRatingsStats = (ratings: number[]) => {
  const totalCount: number = ratings.length;
  const ratingCounts: Record<number, number> = {};

  ratings.forEach((rating) => {
    if (rating >= 1 && rating <= 5) {
      if (ratingCounts[rating]) {
        ratingCounts[rating]++;
      } else {
        ratingCounts[rating] = 1;
      }
    }
  });

  const result: Record<number, { count: number; percentage: number }> = {};
  Object.keys(ratingCounts).forEach((key) => {
    const count = ratingCounts[parseInt(key)];
    const percentage = Math.round((count / totalCount) * 100);
    result[parseInt(key)] = { count, percentage };
  });

  return result;
};
const ratingStats = getRatingsStats(ratings);

const randomReviews = [...Array(100)].map(() => ({
  message:
    faker.commerce.productDescription() + faker.commerce.productDescription() + faker.commerce.productDescription(),
  reviewedOn: faker.date.anytime(),
  reviwedBy: faker.person.fullName(),
  image: faker.image.avatar(),
  rating: faker.number.int({ min: 1, max: 5 }),
}));

const selectOptions = [
  { label: '3 / page', value: 3 },
  { label: '5 / page', value: 5 },
  { label: '10 / page', value: 10 },
  { label: '20 / page', value: 20 },
  { label: '50 / page', value: 50 },
  { label: '100 / page', value: 100 },
];

const CustomerReview = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(selectOptions[0]);

  // Calculate the start and end indices for pagination

  const paginatedReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    return randomReviews.slice(startIndex, endIndex);
  }, [currentPage, pageSize]);

  return (
    <>
      <Typography fontsStyle="large-semi-bold">Customer Reviews</Typography>
      <Stack direction="horizontal" gap={4}>
        <Stack>
          <Stack direction="horizontal" gap={2}>
            <StarRating initialValue={4.4} readonly size={30} />
            <Typography className="mt-1">4.4 out of 5</Typography>
          </Stack>
          <Typography className="mt-2" fontsStyle="base-semi-bold">
            {ratings.length} ratings
          </Typography>
          <Stack gap={2} className="mt-2">
            {Object.entries(ratingStats)
              .sort(([a], [b]) => parseInt(b) - parseInt(a))
              .map(([rating, { percentage }]) => (
                <Stack direction="horizontal" key={rating} className={style.ratingsContainer}>
                  <Typography fontsStyle="caption-normal" className={style.rating}>
                    {rating}
                  </Typography>{' '}
                  <ProgressBar now={percentage} className={style.progressBar} />
                  <Typography fontsStyle="caption-normal" className={style.percentage}>
                    {percentage}%
                  </Typography>
                </Stack>
              ))}
          </Stack>
        </Stack>
        <div></div>

        {/* reviews */}
        <div>
          {/* <div className="d-flex align-items-center gap-3 mb-2">
            <label className="d-inline-flex align-items-center gap-2">
              <SortIcon width={20} height={20} />
              Sort By
            </label>
            <Select
              className={style.select}
              options={[
                { label: 'Top Reviews', value: 'review' },
                { label: 'Recent', value: 'recent' },
              ]}
            />
          </div> */}

          <Stack>
            {paginatedReviews.map(({ message, image, rating, reviewedOn, reviwedBy }, i) => (
              <Stack key={i} className={style.reviewContainer}>
                <Stack direction="horizontal" className="align-items-center justify-content-between">
                  <Stack direction="horizontal" className={style.customerDetail}>
                    <img src={image} />
                    <Typography fontsStyle="base-bold">{reviwedBy}</Typography>
                  </Stack>
                  <Typography fontsStyle="caption-semi-bold">
                    Reviewed on {format(new Date(reviewedOn), 'MMMM dd, yyyy')}
                  </Typography>
                </Stack>
                <Stack>
                  <StarRating initialValue={rating} readonly size={20} />
                </Stack>
                <Typography className="mt-2">{message}</Typography>
                <hr />
              </Stack>
            ))}
          </Stack>
          <div className="d-flex justify-content-end align-items-center">
            <Select
              className={style.select}
              value={pageSize}
              onChange={(value: any) => {
                setPageSize(value);
              }}
              options={[
                { label: '3 / page', value: 3 },
                { label: '5 / page', value: 5 },
                { label: '10 / page', value: 10 },
                { label: '20 / page', value: 20 },
                { label: '50 / page', value: 50 },
                { label: '100 / page', value: 100 },
              ]}
              menuPosition="fixed"
              menuPlacement="auto"
            />
            <CustomPagination
              activePage={currentPage}
              dataCount={randomReviews.length}
              pageSize={pageSize.value}
              onPageChange={(page) => setCurrentPage(page)}
              classes={{ wrapper: 'mb-4' }}
            />
          </div>
        </div>
      </Stack>
    </>
  );
};

export default CustomerReview;
