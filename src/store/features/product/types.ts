export interface ProductType {
  id: string;
  name: string;
  description: string;
  tags: string[];
  attributes: string[];
  productMeta: ProductMeta[];
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
}

export interface ProductMeta {
  id: string;
  sku: string;
  image: string[];
  price: number;
  variant: Record<string, string>;
  stock: number;
  discountPrice: number;
  discountPercentage: number;
  isDefault: boolean;
}
