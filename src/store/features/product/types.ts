export interface ProductType {
  id: string;
  name: string;
  description: string;
  tags: string[];
  attributes: string[];
  productMeta: ProductMeta[];
  categories: { id: string; name: string }[];
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

export interface GetProductsListQuery extends PaginatedQuery {
  search?: string;
  categoryId?: string;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
}
