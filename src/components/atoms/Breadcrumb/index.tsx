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
  className?: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ active, items, className }) => {
  return (
    <BootstrapBreadcrumb className={[style.breadCrumbWrapper, className].join(' ')}>
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
