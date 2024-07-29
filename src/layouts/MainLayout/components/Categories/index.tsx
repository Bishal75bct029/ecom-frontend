import { Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { Typography } from '@/components/atoms';
import style from './style.module.scss';
import { useGetCategoryQuery } from '@/store/features/category';
import { ActiveCategories, AllCategories } from './types';

const Categories = () => {
  const { data: categories, isLoading } = useGetCategoryQuery();

  const [allCategories, setAllCategories] = useState<AllCategories | null>({
    subCategory: [],
    nestedSubCategory: [],
  });

  const [categoryStatus, setCategoryStatus] = useState<ActiveCategories>({
    activeCategory: null,
    activeSubCategory: null,
    activeNestedSubCategory: null,
  });

  if (isLoading) return <Spinner />;

  return (
    <div
      className={style.categories}
      onMouseLeave={() => {
        setAllCategories({ ...allCategories, subCategory: null, nestedSubCategory: null });
        setCategoryStatus({ ...categoryStatus, activeCategory: null, activeSubCategory: null });
      }}
    >
      <div className={style.singleCategory}>
        {categories?.map((category, index) => {
          return (
            <div
              className={style.topCategory}
              key={index}
              onMouseEnter={() => {
                setAllCategories({ ...categories, subCategory: category['children'] ?? null, nestedSubCategory: null });
                setCategoryStatus({ ...categoryStatus, activeCategory: index, activeSubCategory: null });
              }}
            >
              <Typography
                className={`${categoryStatus.activeCategory == index ? style.activeCategoryText : ''} ${style.categoryText}`}
              >
                {category.name}
              </Typography>
              {categoryStatus.activeCategory == index && <i className={style.arrowRight}></i>}
            </div>
          );
        })}
      </div>

      {allCategories?.subCategory && (
        <div className={style.singleCategory}>
          {allCategories?.subCategory?.map((category, index) => {
            return (
              <div
                className={style.subCategory}
                key={index}
                onMouseEnter={() => {
                  setAllCategories({ ...allCategories, nestedSubCategory: category['children'] || null });
                  setCategoryStatus({ ...categoryStatus, activeSubCategory: index });
                }}
              >
                <Typography
                  className={`${categoryStatus.activeSubCategory == index ? style.activeCategoryText : ''} ${style.categoryText}`}
                >
                  {category.name}
                </Typography>
                {categoryStatus.activeSubCategory == index && <i className={style.arrowRight}></i>}
              </div>
            );
          })}
        </div>
      )}

      {allCategories?.nestedSubCategory && (
        <div
          className={style.singleNestedCategory}
          onMouseLeave={() => setAllCategories({ ...allCategories, nestedSubCategory: null })}
        >
          {allCategories?.nestedSubCategory?.map((category, index) => {
            return (
              <div
                onMouseEnter={() => setCategoryStatus({ ...categoryStatus, activeNestedSubCategory: index })}
                onMouseLeave={() => setCategoryStatus({ ...categoryStatus, activeNestedSubCategory: null })}
                className={`${style.nestedSubCategory} ${categoryStatus.activeNestedSubCategory === index ? style.activeNestedCategoryText : ''}`}
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
