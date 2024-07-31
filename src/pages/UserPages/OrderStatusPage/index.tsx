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
      <Typography className={style.header}>My Orders</Typography>
      <div className={style.filters}>
        <p className={`${style.filterItem} ${status == 'all' && style.selected}`} onClick={() => setStatus('all')}>
          All
        </p>
        <p className={`${style.filterItem} ${status !== 'all' && style.selected}`} onClick={() => setStatus('pending')}>
          Pending
        </p>
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
