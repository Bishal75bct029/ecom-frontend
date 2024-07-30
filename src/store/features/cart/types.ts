import { ProductMeta, ProductType } from '../product/types';
import { UserAddress } from '../user/types';

export interface CartItemType extends Omit<ProductType, 'categories'> {}

export interface CartItemTransformedType extends Omit<CartItemType, 'productMeta'> {
  productMeta: ProductMeta;
}

export interface CartState {
  selectedCartProducts: CartItemTransformedType[];
  selectedProductQuantities: Record<string, number>;
  selectedShippingAddress?: UserAddress;
}
