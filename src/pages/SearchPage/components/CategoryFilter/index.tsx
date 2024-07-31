import { FC, useMemo, useState } from 'react';
import { Accordion, Spinner } from 'react-bootstrap';
import { AccordionEventKey } from 'react-bootstrap/esm/AccordionContext';
import { useGetCategoryQuery } from '@/store/features/category';
import { Category } from '@/store/features/category/types';
import style from './style.module.scss';
import { getUrlQueryParams } from '@/utils';
import { useSearchParams } from 'react-router-dom';

const RecursiveAccordion: FC<{ data: Category[]; level?: number }> = ({ data, level = 0 }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeKey, setActiveKey] = useState<AccordionEventKey>();

  if (!data || !data.length) {
    return null;
  }

  if (level === 2) {
    return (
      <div className="d-flex flex-column gap-2 ms-5 ps-3 mb-3">
        {data.map((item, i) => (
          <div
            key={i}
            className={[style.endLevelCategory, searchParams.get('cId') === item.id ? style.selectedCategory : ''].join(
              ' ',
            )}
            onClick={() => {
              const params = getUrlQueryParams({
                q: searchParams.get('q') || '',
                sBy: searchParams.get('sBy') || '',
                cId: searchParams.get('cId') === item.id ? '' : item.id,
              });
              setSearchParams(params);
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Accordion defaultActiveKey={activeKey} className={style.accordion}>
      {data.map((item, index) => (
        <Accordion.Item
          eventKey={`${level}-${index}`}
          key={index}
          className={[
            style.accordianItem,
            level === 1 ? style.headerLevel1 : '',
            level === 1 && index === data.length - 1 ? style.lastItem : '',
          ].join(' ')}
        >
          <Accordion.Header
            onClick={() => {
              const params = getUrlQueryParams({
                q: searchParams.get('q') || '',
                sBy: searchParams.get('sBy') || '',
                cId: activeKey === `${level}-${index}` ? '' : item.id,
              });
              setActiveKey(activeKey === `${level}-${index}` ? undefined : `${level}-${index}`);
              setSearchParams(params);
            }}
          >
            {item.name}
          </Accordion.Header>
          <Accordion.Body className={style.accordionBody}>
            {item.children && item.children.length > 0 && <RecursiveAccordion data={item.children} level={level + 1} />}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

const CategoryFilter = () => {
  const { data, isLoading, isFetching } = useGetCategoryQuery();
  const loading = useMemo(() => isLoading || isFetching, [isLoading, isFetching]);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
        <Spinner />
      </div>
    );
  }

  return <RecursiveAccordion data={data || []} />;
};

export default CategoryFilter;
