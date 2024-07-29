export interface OrderDetailsType {
  totalPrice: number;
  status: string;
  orderItems: OrderItemsType;
}
export interface OrderItemsType {
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
}
