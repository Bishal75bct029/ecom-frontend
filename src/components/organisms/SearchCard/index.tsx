/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Stack } from 'react-bootstrap';

import style from './style.module.scss';
import LaptopImage from '@/assets/icons/Untitled.jpg';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@/components/atoms';

interface SearchCardProps {
  to: string;
  name: string;
}

const SearchCard: FC<Partial<SearchCardProps>> = ({ to }) => {
  const navigate = useNavigate();
  return (
    <Card
      //  onClick={() => navigate(to)}
      className={style.searchCard}
    >
      <img src={LaptopImage} alt="laptop" />
      <Stack className="px-3 mt-2 pb-3">
        <Typography className={style.searchItemName}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, doloremque.
        </Typography>
        <Typography fontsStyle="large-bold" color="primary-purple">
          Rs. 420{' '}
          <Typography component="span" fontsStyle="caption-normal" className="text-line-through" color="silver">
            Rs. 600
          </Typography>
        </Typography>
      </Stack>
    </Card>
  );
};

export default SearchCard;
