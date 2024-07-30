export interface Category {
  name: string;
  image: string;
  parent?: Category | null;
  children?: Category[] | null;
}

export interface CategoryState {
  category: Category;
}
