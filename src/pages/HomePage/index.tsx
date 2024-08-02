import { FC, useMemo } from 'react';
import { SearchCard, SearchCardSkeleton } from '@/components/organisms';
import { useGetProductsQuery } from '@/store/features/product';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Typography } from '@/components/atoms';
import { ProductType } from '@/store/features/product/types';
import carouselImages from './carousel-images';
import style from './style.module.scss';

const ProductsList: FC<{ loading: boolean; data?: PaginatedResponse<ProductType>; count: number; label: string }> = ({
  loading,
  data,
  count,
  label,
}) => {
  const randomizedItems = useMemo(() => {
    if (data?.items) {
      const shuffledItems = [...data.items].sort(() => Math.random() - 0.5);
      return shuffledItems.slice(0, count);
    }
    return [];
  }, [data?.items, count]);

  return (
    <>
      <Typography fontsStyle="large-semi-bold" className="mb-3" color="primary-purple">
        {label}
      </Typography>
      {loading && <SearchCardSkeleton count={count} />}
      {!loading && (
        <div className={style.cardsContainer}>
          {randomizedItems.map(({ id, ...item }) => (
            <SearchCard key={id} to={`/product/${id}`} id={id} {...item} />
          ))}
        </div>
      )}
    </>
  );
};

const Homepage = () => {
  const { data, isLoading, isFetching } = useGetProductsQuery({ page: 1, limit: Number.MAX_SAFE_INTEGER });

  const loading = useMemo(() => isLoading || isFetching, [isLoading, isFetching]);

  return (
    <>
      {/* <Breadcrumb active="Products" items={[{ label: 'Home', link: '/' }]} /> */}
      <div style={{ maxWidth: '100%' }} className="mb-4">
        <Carousel
          className="customCarousal"
          showIndicators={false}
          autoPlay
          infiniteLoop
          stopOnHover
          showThumbs={false}
          showArrows
          interval={3000}
        >
          {carouselImages.map((image, i) => (
            <img key={i} src={image} alt="image" style={{ borderRadius: '6px', height: '400px', objectFit: 'cover' }} />
          ))}
        </Carousel>
      </div>
      <ProductsList loading={loading} data={data} count={10} label="Top Products" />
      <hr />
      <ProductsList loading={loading} data={data} count={10} label="Just For You" />
    </>
  );
};

export default Homepage;
