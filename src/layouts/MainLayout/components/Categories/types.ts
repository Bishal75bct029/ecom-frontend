export interface Category {
  name: string;
  image: string;
  parent?: Category | null;
  children?: Category[] | null;
}

export interface ActiveCategories {
  activeCategory: number | null;
  activeSubCategory: number | null;
  activeNestedSubCategory: number | null;
}

export interface AllCategories {
  subCategory: Category[] | null;
  nestedSubCategory: Category[] | null;
}
