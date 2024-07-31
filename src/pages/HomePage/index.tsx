import { useMemo } from 'react';
import { Spinner } from 'react-bootstrap';
import { SearchCard } from '@/components/organisms';
import { useGetProductsQuery } from '@/store/features/product';
import style from './style.module.scss';

const Homepage = () => {
  const { data, isLoading, isFetching } = useGetProductsQuery({ page: 1, limit: Number.MAX_SAFE_INTEGER });

  const loading = useMemo(() => isLoading || isFetching, [isLoading, isFetching]);

  return (
    <>
      {loading && (
        <div className="d-flex align-items-center justify-content-center" style={{ height: '75vh' }}>
          <Spinner />
        </div>
      )}
      {!loading && (
        <div className={style.cardsContainer}>
          {data?.items.map(({ id, ...item }) => <SearchCard key={id} to={`/product/${id}`} id={id} {...item} />)}
        </div>
      )}
    </>
  );
};

export default Homepage;
