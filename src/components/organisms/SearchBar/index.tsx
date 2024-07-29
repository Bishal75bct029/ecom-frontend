import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import style from './style.module.scss';
import { SearchIcon } from '@/assets/icons';
import { TextInput, Typography } from '@/components/atoms';
import { useLazyGetProductsQuery } from '@/store/features/product';
import { debounce } from 'lodash';
import { ProductType } from '@/store/features/product/types';
import { Spinner, Stack } from 'react-bootstrap';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState<string>('');
  const [products, setProducts] = useState<ProductType[]>([]);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  const [getProducts, { isLoading }] = useLazyGetProductsQuery();

  useEffect(() => {
    if (searchParams.get('q') && inputRef.current) {
      inputRef.current.value = searchParams.get('q') || '';
    }
  }, [searchParams]);

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value.trim().length < 3) return;
    getProducts({ search: e.target.value, page: 1, limit: 3 })
      .unwrap()
      .then((res) => {
        setProducts(res.items);
      });
  }, 500);

  const memoizedProducts = useMemo(() => {
    return products;
  }, [products]);

  return (
    <div className={style.searchBarWrapper}>
      <TextInput
        ref={inputRef}
        placeholder="What are you looking for?"
        className={style.searchBarContainer}
        inputClassName={[style.searchBarInput].join(' ')}
        endIcon={<SearchIcon />}
        endIconClassName={style.endIcon}
        handleEndIconClick={() => inputRef.current?.focus()}
        onChange={handleChange}
        onKeyDown={(e) => e.key === 'Enter' && navigate(`/search?q=${e.currentTarget.value}`)}
        onFocus={() => setShowSearchBar(true)}
        onBlur={() => setShowSearchBar(false)}
      />
      {value && !pathname.includes('search') && showSearchBar && (
        <div className={style.searchBarOutput} ref={searchContainerRef}>
          <div className="px-3 py-2">
            <Typography fontsStyle="base-semi-bold" className="mb-2">
              Products
            </Typography>
            {isLoading && (
              <div className="d-flex align-items-center justify-content-center" style={{ height: '120px' }}>
                <Spinner />
              </div>
            )}
            {!isLoading && (
              <div className="d-flex flex-column">
                {memoizedProducts?.map((item, i) => (
                  <div key={i}>
                    <div className={style.searchItem} onClick={() => navigate(`/product/${item.id}`)}>
                      <div className={style.imgContainer}>
                        <img src={item.productMeta[0]?.image[0]} alt={item.name} />
                      </div>
                      <div style={{ width: 'calc(100% - 100px)' }}>
                        <Typography fontsStyle="small-semi-bold">{item.name}</Typography>
                        <Typography fontsStyle="caption-normal" className={style.productDescription}>
                          {item.description}
                        </Typography>
                        <div className="d-flex flex-column gap-2 mt-2">
                          {Object.entries(item.productMeta[0].variant || {}).map(([key, val], i) => (
                            <Stack key={i} direction="horizontal">
                              <Typography fontsStyle="caption-semi-bold" className="me-3">
                                {key}:{' '}
                                <Typography component={'span'} className={style.variantCard}>
                                  {val}
                                </Typography>
                              </Typography>
                            </Stack>
                          ))}
                        </div>
                      </div>
                    </div>
                    <hr className={i === products.length - 1 ? 'd-none' : ''} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={style.viewMoreButton} onClick={() => navigate(`/search?q=${value}`)}>
            View more products
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
