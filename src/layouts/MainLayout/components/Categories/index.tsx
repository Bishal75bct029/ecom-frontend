import { Typography } from '@/components/atoms';
import style from './style.module.scss';
import { useState } from 'react';

type Category = {
  name: string;
  image: string;
  parent?: Category | null;
  children?: Category[] | null;
};

const Categories = () => {
  const [subCategory, setSubCategory] = useState<Category[] | undefined | null>();
  const [nestedSubCategory, setNestedSubCategory] = useState<Category[] | undefined | null>();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<number | null>(null);

  const categories = [
    {
      name: 'Electronic Devices',
      image: '',
      parent: null,
      children: [
        {
          name: 'SmartPhones',
          image: '',
          children: [
            {
              name: 'Samsung Mobile',
              image: '',
              children: null,
              parent: {
                name: 'Electronic Devices',
                image: 'https://static-01.daraz.com.np/p/35d822d21ab4ea3c1bac36565c852944.jpg_750x750.jpg_.webp',
              },
            },
            {
              name: 'Redmi Mobile',
              image: 'https://static-01.daraz.com.np/p/45800a055b698f87a3b1ed2732a13ab8.jpg_750x750.jpg_.webp',
              children: null,
            },
          ],
        },
        {
          name: 'Tablet',
          image: 'https://static-01.daraz.com.np/p/b2f94dd0976797d72d2db484e2238d09.jpg_750x750.jpg_.webp',
          children: [
            {
              name: 'Apple Ipads',
              image: 'https://static-01.daraz.com.np/p/e8b18d6d85b97f66a59ee28bd5f178f7.png_750x750.jpg_.webp',
              children: null,
            },
            {
              name: 'Xiami Pad',
              image: 'https://static-01.daraz.com.np/p/b2f94dd0976797d72d2db484e2238d09.jpg_750x750.jpg_.webp',
              children: null,
            },
          ],
        },
        {
          name: 'Laptops',
          image: '',
          children: [
            {
              name: 'Macbook',
              image: 'https://static-01.daraz.com.np/p/01107bf10c6441bb8ebdf93d8a9e791b.jpg_750x750.jpg_.webp',
              children: null,
            },
            {
              name: 'Lenovo',
              image: 'https://static-01.daraz.com.np/p/da3457614406a37b9ba9158695f663d6.jpg_750x750.jpg_.webp',
              children: null,
            },
            {
              name: 'ACER',
              image: 'https://static-01.daraz.com.np/p/c4d69db3864b8edbe9cb532a82349ef5.jpg_750x750.jpg_.webp',
              children: null,
            },
          ],
        },
        {
          name: 'Laptops',
          image: '',
          children: [
            {
              name: 'Macbook',
              image: 'https://static-01.daraz.com.np/p/01107bf10c6441bb8ebdf93d8a9e791b.jpg_750x750.jpg_.webp',
              children: null,
            },
            {
              name: 'Lenovo',
              image: 'https://static-01.daraz.com.np/p/da3457614406a37b9ba9158695f663d6.jpg_750x750.jpg_.webp',
              children: null,
            },
            {
              name: 'ACER',
              image: 'https://static-01.daraz.com.np/p/c4d69db3864b8edbe9cb532a82349ef5.jpg_750x750.jpg_.webp',
              children: null,
            },
          ],
        },
      ],
    },
    {
      name: 'Accessories',
      image: '',
      parent: null,
      children: [
        {
          name: 'Cell Phones',
          image: '',
          children: [
            {
              name: 'Samsung Phone',
              image: '',
              children: null,
              parent: {
                name: 'Electronic Devices',
                image: 'https://static-01.daraz.com.np/p/35d822d21ab4ea3c1bac36565c852944.jpg_750x750.jpg_.webp',
              },
            },
            {
              name: 'Redmi Phones',
              image: 'https://static-01.daraz.com.np/p/45800a055b698f87a3b1ed2732a13ab8.jpg_750x750.jpg_.webp',
              children: null,
            },
          ],
        },
        {
          name: 'Local Phones',
          image: '',
          children: [
            {
              name: 'Local Phone',
              image: '',
              children: null,
              parent: {
                name: 'Electronic Devices',
                image: 'https://static-01.daraz.com.np/p/35d822d21ab4ea3c1bac36565c852944.jpg_750x750.jpg_.webp',
              },
            },
            {
              name: 'Redmi Phones',
              image: 'https://static-01.daraz.com.np/p/45800a055b698f87a3b1ed2732a13ab8.jpg_750x750.jpg_.webp',
              children: null,
            },
          ],
        },
        {
          name: 'Smart Phones',
          image: '',
          children: [
            {
              name: 'Samsung Phone',
              image: '',
              children: null,
              parent: {
                name: 'Electronic Devices',
                image: 'https://static-01.daraz.com.np/p/35d822d21ab4ea3c1bac36565c852944.jpg_750x750.jpg_.webp',
              },
            },
            {
              name: 'Redmi Phones',
              image: 'https://static-01.daraz.com.np/p/45800a055b698f87a3b1ed2732a13ab8.jpg_750x750.jpg_.webp',
              children: null,
            },
          ],
        },
        {
          name: 'New Phones',
          image: '',
          children: [
            {
              name: 'Samsung Phone',
              image: '',
              children: null,
              parent: {
                name: 'Electronic Devices',
                image: 'https://static-01.daraz.com.np/p/35d822d21ab4ea3c1bac36565c852944.jpg_750x750.jpg_.webp',
              },
            },
            {
              name: 'Redmi Phones',
              image: 'https://static-01.daraz.com.np/p/45800a055b698f87a3b1ed2732a13ab8.jpg_750x750.jpg_.webp',
              children: null,
            },
          ],
        },

        {
          name: 'Old Phones',
          image: '',
          children: [
            {
              name: 'Samsung Phone',
              image: '',
              children: null,
              parent: {
                name: 'Electronic Devices',
                image: 'https://static-01.daraz.com.np/p/35d822d21ab4ea3c1bac36565c852944.jpg_750x750.jpg_.webp',
              },
            },
            {
              name: 'Redmi Phones',
              image: 'https://static-01.daraz.com.np/p/45800a055b698f87a3b1ed2732a13ab8.jpg_750x750.jpg_.webp',
              children: null,
            },
          ],
        },
        {
          name: 'Tablet',
          image: 'https://static-01.daraz.com.np/p/b2f94dd0976797d72d2db484e2238d09.jpg_750x750.jpg_.webp',
          children: [
            {
              name: 'Apple Ipads',
              image: 'https://static-01.daraz.com.np/p/e8b18d6d85b97f66a59ee28bd5f178f7.png_750x750.jpg_.webp',
              children: null,
            },
            {
              name: 'Xiami Pad',
              image: 'https://static-01.daraz.com.np/p/b2f94dd0976797d72d2db484e2238d09.jpg_750x750.jpg_.webp',
              children: null,
            },
          ],
        },
        {
          name: 'PC',
          image: '',
          children: [
            {
              name: 'HP',
              image: 'https://static-01.daraz.com.np/p/01107bf10c6441bb8ebdf93d8a9e791b.jpg_750x750.jpg_.webp',
              children: null,
            },
            {
              name: 'Lenovo',
              image: 'https://static-01.daraz.com.np/p/da3457614406a37b9ba9158695f663d6.jpg_750x750.jpg_.webp',
              children: null,
            },
            {
              name: 'Asus',
              image: 'https://static-01.daraz.com.np/p/c4d69db3864b8edbe9cb532a82349ef5.jpg_750x750.jpg_.webp',
              children: null,
            },
          ],
        },
      ],
    },
  ];
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
              <div className={style.nestedSubCategory} key={index}>
                <img src={category.image || 'https://via.placeholder.com/50'} alt="" className={style.image} />
                <Typography>{category.name}</Typography>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Categories;
