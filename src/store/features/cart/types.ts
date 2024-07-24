import { ProductMeta, ProductType } from '../product/types';

export interface CartItemType extends Omit<ProductType, 'categories'> {}

export interface CartState {
  selectedCartProducts: ProductMeta[];
  selectedProductQuantities: Record<string, number>;
}
