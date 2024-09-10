import { useMemo, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Button, Typography } from '@/components/atoms';
import { useGetOrderListQuery } from '@/store/features/order';
import { OrderHistoryCard } from './components';
import style from './style.module.scss';
import { RemoveCircleIcon } from '@/assets/icons';

const OrderStatus = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('all');
  const { data: orders, isLoading, isFetching } = useGetOrderListQuery({ status });

  const loading = useMemo(() => isLoading || isFetching, [isLoading, isFetching]);

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <div style={{ width: '900px' }}>
        <Breadcrumb active="My Orders" items={[{ label: 'Home', link: '/' }]} className={style.breadcrumb} />
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
      </div>

      <div className="w-100 d-flex flex-column align-items-center">
        {loading && (
          <div className={style.spinner}>
            <Spinner />
          </div>
        )}
        {!loading && !!orders?.length && <OrderHistoryCard orders={orders} />}
        {!loading && !orders?.length && (
          <div className={style.emptyOrder}>
            <Typography fontsStyle="base-semi-bold" color="primary-purple" className="d-flex align-items-center gap-2">
              <RemoveCircleIcon /> No Orders Found.
            </Typography>
            <Button variant="secondary" onClick={() => navigate('/')}>
              Let's start shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
