import { FC } from 'react';
import LoadingSkeleton, { SkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Skeleton: FC<SkeletonProps> = ({ inline = true, ...rest }) => {
  return <LoadingSkeleton {...rest} inline={inline} />;
};

export default Skeleton;
