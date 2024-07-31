import { useMemo } from 'react';
import { SearchCard, SearchCardSkeleton } from '@/components/organisms';
import { useGetProductsQuery } from '@/store/features/product';
import 'react-loading-skeleton/dist/skeleton.css';
import style from './style.module.scss';

const Homepage = () => {
  const { data, isLoading, isFetching } = useGetProductsQuery({ page: 1, limit: Number.MAX_SAFE_INTEGER });

  const loading = useMemo(() => isLoading || isFetching, [isLoading, isFetching]);

  return (
    <>
      {loading && <SearchCardSkeleton count={15} />}
      {!loading && (
        <div className={style.cardsContainer}>
          {data?.items.map(({ id, ...item }) => <SearchCard key={id} to={`/product/${id}`} id={id} {...item} />)}
        </div>
      )}
    </>
  );
};

export default Homepage;
