import { FC } from 'react';
import { Stack } from 'react-bootstrap';
import { Skeleton } from '@/components/atoms';
import style from './style.module.scss';

const SearchCardSkeleton: FC<{ count: number }> = ({ count }) => {
  return (
    <div className="d-flex gap-3 flex-wrap">
      {[...Array(count)].map((_, i) => (
        <Stack key={i}>
          <Skeleton width={275} height={206} baseColor="#fff" />
          <Stack className={style.searchCardStack}>
            <Skeleton height={20} />
            <Skeleton height={20} />
            <div className="d-flex gap-2 my-2">
              <Skeleton height={20} width={40} />
              <Skeleton height={20} width={40} />
            </div>
            <Skeleton height={20} width={130} />
          </Stack>
        </Stack>
      ))}
    </div>
  );
};

export default SearchCardSkeleton;
