import { Category } from '@/store/features/category/types';

export interface ActiveCategories {
  activeCategory: number | null;
  activeSubCategory: number | null;
  activeNestedSubCategory: number | null;
}

export interface AllCategories {
  subCategory: Category[] | null;
  nestedSubCategory: Category[] | null;
}
