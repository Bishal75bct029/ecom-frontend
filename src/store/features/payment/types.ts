export interface PaymentMethodType {
  id: string;
  name: string;
  isActive: boolean;
}

export interface PostOrderPayload {
  productMetaIds: { id: string; quantity: number }[];
  paymentMethodId: string;
}
