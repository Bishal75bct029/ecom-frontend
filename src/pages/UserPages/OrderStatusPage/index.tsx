import { useMemo, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Typography } from '@/components/atoms';
import { useGetOrderListQuery } from '@/store/features/order';
import { OrderHistoryCard } from './components';
import style from './style.module.scss';

export const OrderStatus = () => {
  const [status, setStatus] = useState('all');
  const { data: orders, isLoading, isFetching } = useGetOrderListQuery({ status });

  const loading = useMemo(() => isLoading || isFetching, [isLoading, isFetching]);

  return (
    <div>
      <Typography fontsStyle="large-bold">My Orders</Typography>
      <div className={style.filters}>
        <Typography
          fontsStyle="base-semi-bold"
          className={`${style.filterItem} ${status == 'all' && style.selected}`}
          onClick={() => setStatus('all')}
        >
          All
        </Typography>
        <Typography
          fontsStyle="base-semi-bold"
          className={`${style.filterItem} ${status !== 'all' && style.selected}`}
          onClick={() => setStatus('pending')}
        >
          Pending
        </Typography>
      </div>

      {loading && (
        <div className={style.spinner}>
          <Spinner />
        </div>
      )}
      {!loading && !!orders?.length && <OrderHistoryCard orders={orders} />}
      {!loading && !orders?.length && (
        <div className={style.emptyOrder}>
          <Typography>No Orders</Typography>
        </div>
      )}
    </div>
  );
};
