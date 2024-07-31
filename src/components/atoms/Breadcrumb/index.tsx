import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb as BootstrapBreadcrumb } from 'react-bootstrap';
import { PlayIcon } from '@/assets/icons';
import style from './style.module.scss';

type BreadcrumbItem = {
  label: string;
  link: string;
};

export interface BreadcrumbProps {
  active: string;
  items: BreadcrumbItem[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ active, items }) => {
  return (
    <BootstrapBreadcrumb className={style.breadCrumbWrapper}>
      {items.map(({ label, link }, index) => [
        <BootstrapBreadcrumb.Item linkAs={Link} linkProps={{ to: link }} key={`${index}-item`}>
          {label}
        </BootstrapBreadcrumb.Item>,
        <PlayIcon />,
      ])}

      <BootstrapBreadcrumb.Item active className={style.activeBreadCrumb}>
        {active}
      </BootstrapBreadcrumb.Item>
    </BootstrapBreadcrumb>
  );
};

export default Breadcrumb;
