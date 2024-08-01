export interface Category {
  id: string;
  name: string;
  image: string;
  parent?: Category | null;
  parentId?: string | null;
  children?: Category[] | null;
}
