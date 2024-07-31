export interface Category {
  id: string;
  name: string;
  image: string;
  parent?: Category | null;
  children?: Category[] | null;
}

export interface CategoryState {
  category: Category;
}
