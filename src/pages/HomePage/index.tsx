import { Spinner } from 'react-bootstrap';
import { SearchCard } from '@/components/organisms';
import { useGetProductsQuery } from '@/store/features/product';
import style from './style.module.scss';

const Homepage = () => {
  const { data, isLoading } = useGetProductsQuery();

  if (isLoading) {
    <div className="d-flex align-items-center justify-content-center">
      <Spinner />
    </div>;
  }

  return (
    <>
      <div className={style.cardsContainer}>
        {data?.map(({ id, ...item }) => <SearchCard key={id} to={`/${id}`} id={id} {...item} />)}
      </div>
    </>
  );
};

export default Homepage;
