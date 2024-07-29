import { useGetAllOrdersQuery } from '@/store/features/order';

export const OrderStatus = () => {
  const { data: orders } = useGetAllOrdersQuery();

  return (
    <div style={{}}>
      {orders &&
        orders.map((order, index) => {
          return <div key={index}>{order.totalPrice}</div>;
        })}
    </div>
  );
};
