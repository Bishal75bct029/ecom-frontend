import { Spinner } from 'react-bootstrap';
import { SearchCard } from '@/components/organisms';
import { useGetProductsQuery } from '@/store/features/product';
import style from './style.module.scss';

const Homepage = () => {
  const { data, isLoading } = useGetProductsQuery();
  console.log(data);

  return (
    <>
      {isLoading && (
        <div className="d-flex align-items-center justify-content-center" style={{ height: '75vh' }}>
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <div className={style.cardsContainer}>
          {data?.items?.map(({ id, ...item }) => <SearchCard key={id} to={`/${id}`} id={id} {...item} />)}
        </div>
      )}
    </>
  );
};

export default Homepage;
