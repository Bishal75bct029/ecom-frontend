import { Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { Typography } from '@/components/atoms';
import style from './style.module.scss';
import { useGetCategoryQuery } from '@/store/features/category';
import { Category } from '@/store/features/category/types';

const Categories = () => {
  const [subCategory, setSubCategory] = useState<Category[] | undefined | null>();
  const [nestedSubCategory, setNestedSubCategory] = useState<Category[] | undefined | null>();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<number | null>(null);
  const [activeNestedSubCategory, setActiveNestedSubCategory] = useState<number | null>(null);

  const { data: categories, isLoading, error } = useGetCategoryQuery();

  if (isLoading) return <Spinner />;
  if (error) return <>{error}</>;

  return (
    <div
      className={style.categories}
      onMouseLeave={() => {
        setSubCategory(null);
        setNestedSubCategory(null);
        setActiveCategory(null);
        setActiveSubCategory(null);
      }}
    >
      <div className={style.singleCategory}>
        {categories?.map((category, index) => {
          return (
            <div
              className={style.topCategory}
              onMouseEnter={() => {
                setSubCategory(category['children']);
                setNestedSubCategory(null);
                setActiveSubCategory(null);
                setActiveCategory(index);
              }}
            >
              <Typography
                className={`${activeCategory == index ? style.activeCategoryText : ''} ${style.categoryText}`}
              >
                {category.name}
              </Typography>
              {activeCategory == index && <i className={style.arrowRight}></i>}
            </div>
          );
        })}
      </div>

      {subCategory && (
        <div className={style.singleCategory}>
          {subCategory?.map((category, index) => {
            return (
              <div
                className={style.subCategory}
                onMouseEnter={() => {
                  setNestedSubCategory(category['children']);
                  setActiveSubCategory(index);
                }}
              >
                <Typography
                  className={`${activeSubCategory == index ? style.activeCategoryText : ''} ${style.categoryText}`}
                >
                  {category.name}
                </Typography>
                {activeSubCategory == index && <i className={style.arrowRight}></i>}
              </div>
            );
          })}
        </div>
      )}

      {nestedSubCategory && (
        <div className={style.singleNestedCategory} onMouseLeave={() => setNestedSubCategory(null)}>
          {nestedSubCategory?.map((category, index) => {
            return (
              <div
                onMouseEnter={() => setActiveNestedSubCategory(index)}
                onMouseLeave={() => setActiveNestedSubCategory(null)}
                className={`${style.nestedSubCategory} ${activeNestedSubCategory === index ? style.activeNestedCategoryText : ''}`}
                key={index}
              >
                <img src={category.image || 'https://via.placeholder.com/50'} alt="" className={style.image} />
                <Typography className={style.text}>{category.name}</Typography>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Categories;
