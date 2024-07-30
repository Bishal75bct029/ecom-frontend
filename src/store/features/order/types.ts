export interface PaymentMethodType {
  id: string;
  name: string;
  isActive: boolean;
}

export interface PostOrderPayload {
  productMetaIds: { id: string; quantity: number }[];
  paymentMethodId: string;
}

export interface OrderType {
  id: string;
  deletedAt: null;
  createdAt: Date;
  updatedAt: Date;
  totalPrice: number;
  status: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: string;
  quantity: string;
  pricePerUnit: number;
  totalPrice: number;
  productMeta: OrderProductMeta;
}

export interface OrderProductMeta {
  id: string;
  image: string[];
  price: number;
  variant: Record<string, string>;
  product: { id: string; name: string };
}
