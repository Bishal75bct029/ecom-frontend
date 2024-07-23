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
          name: 'PCS',
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
      }}
    >
      <div className={style.singleCategory}>
        {categories?.map((category) => {
          return (
            <div
              className={style.subCategory}
              onMouseEnter={() => {
                setSubCategory(category['children']);
                setNestedSubCategory(null);
              }}
            >
              <Typography>{category.name}</Typography>
            </div>
          );
        })}
      </div>

      <div className={style.singleCategory}>
        {subCategory?.map((category) => {
          return (
            <div className={style.nestedSubCategory} onMouseEnter={() => setNestedSubCategory(category['children'])}>
              <img src={category.image || 'https://via.placeholder.com/50'} alt="" className={style.image} />
              <Typography>{category.name}</Typography>
            </div>
          );
        })}
      </div>

      <div className={style.singleCategory} onMouseLeave={() => setNestedSubCategory(null)}>
        {nestedSubCategory?.map((category) => {
          return (
            <div className={style.topCategory}>
              <img src={category.image || 'https://via.placeholder.com/50'} alt="" className={style.image} />
              <Typography>{category.name}</Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
