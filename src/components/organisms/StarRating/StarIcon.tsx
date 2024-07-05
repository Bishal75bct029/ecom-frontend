import { FC } from 'react';

export interface StarIconProps {
  size?: number;
}

export const StarIcon: FC<StarIconProps> = ({ size }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
    </svg>
  );
};
