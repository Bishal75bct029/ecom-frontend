import { Category } from './types';

export const transformCategories = (categories: Category[], parentId: string | null = null) => {
  return categories.map((category) => {
    const transformedCategory: Category = {
      ...category,
      parentId: parentId || category.parentId,
      children: category.children ? transformCategories(category.children, category.id) : null,
    };

    return transformedCategory;
  });
};
