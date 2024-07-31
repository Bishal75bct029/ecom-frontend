import { useMemo, useState } from 'react';
import { Col, Row, Spinner, Stack } from 'react-bootstrap';

import style from './style.module.scss';
import { Breadcrumb, Button, HookForm, HookFormProvider, HookTextInput, Select, Typography } from '@/components/atoms';
import { useGetProductsQuery } from '@/store/features/product';
import { SearchCard } from '@/components/organisms';
import Pagination from '@/components/atoms/Pagination';
import { useSearchParams } from 'react-router-dom';
import { SelectOptionItem } from '@/components/atoms/Select';
import { RemoveCircleIcon } from '@/assets/icons';
import { useFormContext } from 'react-hook-form';
import { CategoryFilter } from './components';

interface PriceFormProps {
  minPrice: number;
  maxPrice: number;
}

const sortByOptions = [
  { label: 'Newest Arrivals', value: 'NA' },
  { label: 'Price: High to Low', value: 'PHL' },
  { label: 'Price: Low to High', value: 'PLH' },
];

const SearchPageView = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { watch, handleSubmit } = useFormContext<PriceFormProps>();

  const [minPrice, maxPrice] = watch(['minPrice', 'maxPrice']);

  const [paginationQuery, setPaginationQuery] = useState<Required<PaginatedQuery> & Partial<PriceFormProps>>({
    page: 1,
    limit: 8,
  });

  const searchPaginationQuery = useMemo(() => {
    return {
      ...paginationQuery,
      search: searchParams.get('q') || '',
      sortBy: searchParams.get('sBy') || '',
      categoryId: searchParams.get('cId') || '',
    };
  }, [searchParams, paginationQuery]);

  const { data, isLoading, isFetching } = useGetProductsQuery({ ...searchPaginationQuery });

  const loading = useMemo(() => isLoading || isFetching, [isLoading, isFetching]);

  const onSubmit = (payload: PriceFormProps) => {
    setPaginationQuery((prev) => ({ ...prev, ...payload }));
  };

  return (
    <>
      <Breadcrumb active="Search" items={[{ label: 'Home', link: '/' }]} />
      <Row className="mb-3">
        <Col sm={3} className={style.filterContainer}>
          <Typography fontsStyle="large-semi-bold">Filters</Typography>
          <hr className="mt-0 mb-3" />
          <Typography className="mb-1" fontsStyle="base-semi-bold">
            Price
          </Typography>
          <HookForm onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex align-items-center gap-2">
              <HookTextInput
                name="minPrice"
                type="number"
                placeholder="Min"
                min={0}
                inputClassName={style.inputPadding}
              />
              <Typography fontsStyle="base-semi-bold">-</Typography>
              <HookTextInput
                name="maxPrice"
                type="number"
                placeholder="Max"
                min={0}
                inputClassName={style.inputPadding}
              />
              <Button type="submit" disabled={!minPrice || !maxPrice || minPrice > maxPrice}>
                APPLY
              </Button>
            </div>
          </HookForm>
          <hr className="mt-3 mb-3" />
          <Typography className="mb-1" fontsStyle="base-semi-bold">
            Categories
          </Typography>
          <CategoryFilter />
        </Col>
        <Col sm={9}>
          <div className="mb-4 d-flex align-items-center justify-content-between">
            <Typography fontsStyle="large-semi-bold">Search Results ({data?.count || 0})</Typography>
            <Select
              controlClass={style.filterSelectControl}
              className={style.selectClass}
              placeholder="Sort by"
              options={sortByOptions}
              isClearable
              value={sortByOptions.find((option) => option.value === searchPaginationQuery.sortBy)}
              onChange={(val) => {
                const sortBy = val ? (val as SelectOptionItem).value : '';
                setSearchParams({ q: searchPaginationQuery.search, sBy: sortBy });
              }}
            />
          </div>
          {loading && (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '180px' }}>
              <Spinner />
            </div>
          )}
          {!loading && !data?.items.length && (
            <Stack className={style.noResultFoundContainer}>
              <Typography
                fontsStyle="base-semi-bold"
                color="secondary-red"
                className="d-flex align-items-center gap-1 mb-1"
              >
                <RemoveCircleIcon />
                No Result Found
              </Typography>
              <Typography fontsStyle="caption-semi-bold">Please, try adjusting your search term.</Typography>
            </Stack>
          )}
          {!loading && !!data?.items.length && (
            <>
              <div className={style.searchResultContainer}>
                {data?.items.map((product, i) => <SearchCard key={i} {...product} to={`/product/${product.id}`} />)}
              </div>
              <div className="d-flex justify-content-end ">
                <Pagination
                  activePage={paginationQuery.page}
                  dataCount={data?.count || 0}
                  onPageChange={(page) => setPaginationQuery((prev) => ({ ...prev, page }))}
                  pageSize={paginationQuery.limit}
                />
              </div>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

const SearchPage = () => (
  <HookFormProvider>
    <SearchPageView />
  </HookFormProvider>
);

export default SearchPage;
