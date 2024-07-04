import { SearchCard } from '@/components/organisms';

import style from './style.module.scss';

export const Homepage = () => {
  return (
    <>
      <div className={style.cardsContainer}>
        {[...Array(10)].map((_, index) => (
          <SearchCard key={index} />
        ))}
      </div>
    </>
  );
};
