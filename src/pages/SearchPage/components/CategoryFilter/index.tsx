import { FC, useEffect, useMemo, useState } from 'react';
import { Accordion, Spinner } from 'react-bootstrap';
import { AccordionEventKey } from 'react-bootstrap/esm/AccordionContext';
import { useGetCategoryQuery } from '@/store/features/category';
import { Category } from '@/store/features/category/types';
import style from './style.module.scss';
import { getUrlQueryParams } from '@/utils';
import { useSearchParams } from 'react-router-dom';

interface RecursiveAccordionProps {
  level?: number;
  data: Category[];
  setParentKey?: React.Dispatch<React.SetStateAction<AccordionEventKey>>;
}

const EndLevelCategories: FC<{ data: Category[] }> = ({ data }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="d-flex flex-column gap-2 ms-5 ps-3 mb-3">
      {data.map((item) => (
        <div
          key={item.id}
          className={`${style.endLevelCategory} ${searchParams.get('cId') === item.id ? style.selectedCategory : ''}`}
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
};

const RecursiveAccordion: FC<RecursiveAccordionProps> = ({ data, level = 0, setParentKey }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeKey, setActiveKey] = useState<AccordionEventKey>(null);

  useEffect(() => {
    const categoryId = searchParams.get('cId');
    if (level !== 1 || !categoryId) return;

    const category = data.find((item) => item.id === categoryId);
    if (category) {
      setActiveKey(`${level}-${category.id}`);
      setParentKey?.(`${level - 1}-${category.parentId}`);
    } else if (data[0] && categoryId === data[0].parentId) {
      setParentKey?.(`${level - 1}-${data[0].parentId}`);
    }
  }, []);

  if (!data || !data.length) {
    return null;
  }

  if (level === 2) {
    return <EndLevelCategories data={data} />;
  }

  return (
    <Accordion defaultActiveKey={activeKey} activeKey={activeKey} className={style.accordion}>
      {data.map((item, index) => (
        <Accordion.Item
          eventKey={`${level}-${item.id}`}
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
                cId: activeKey === `${level}-${item.id}` ? '' : item.id,
              });
              setActiveKey(activeKey === `${level}-${item.id}` ? undefined : `${level}-${item.id}`);
              setSearchParams(params);
            }}
          >
            {item.name}
          </Accordion.Header>
          <Accordion.Body className={style.accordionBody}>
            {item.children && item.children.length > 0 && (
              <RecursiveAccordion data={item.children} level={level + 1} setParentKey={setActiveKey} />
            )}
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
