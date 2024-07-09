import { Pagination as BootstrapPagination, PaginationProps as BootstrapPaginationProps } from 'react-bootstrap';

import style from './style.module.scss';
import { ChevronUpIcon } from '@/assets/icons';

interface FetchPageNumbersProps {
  totalPages: number;
  activePage: number;
  pageNeighbors: number;
}

export interface PaginationClasses {
  wrapper?: string;
}

export interface PaginationProps extends BootstrapPaginationProps {
  activePage: number;
  onPageChange: (val: number) => void;
  dataCount: number;
  pageSize?: number;
  /**
   * Number of pages around the active page
   */
  pageNeighbors?: number;
  // onPageSizeChange?: (val: number) => void;
  classes?: PaginationClasses;
  hidePagination?: boolean;
}

const getPageRange = (from: number, to: number, step = 1) => {
  let i = from;
  const numRange: number[] = [];

  while (i <= to) {
    numRange.push(i);
    i += step;
  }

  return numRange;
};

const fetchPageNumbers = ({ totalPages, activePage, pageNeighbors }: FetchPageNumbersProps) => {
  /**
   * totalNumbers: the total page numbers to show on the control
   * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
   */
  const totalNumbers = pageNeighbors * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, activePage - pageNeighbors);
    const endPage = Math.min(totalPages - 1, activePage + pageNeighbors);
    let pages = getPageRange(startPage, endPage);

    /**
     * hasLeftSpill: has hidden pages to the left
     * hasRightSpill: has hidden pages to the right
     * spillOffset: number of hidden pages either to the left or to the right
     */
    const hasLeftSpill = startPage > 2;
    const hasRightSpill = totalPages - endPage > 1;
    const spillOffset = totalNumbers - (pages.length + 1);

    switch (true) {
      case hasLeftSpill && !hasRightSpill: {
        const extraPages = getPageRange(startPage - spillOffset, startPage - 1);
        pages = [-1, ...extraPages, ...pages];
        break;
      }

      case !hasLeftSpill && hasRightSpill: {
        const extraPages = getPageRange(endPage + 1, endPage + spillOffset);
        pages = [...pages, ...extraPages, -1];
        break;
      }

      case hasLeftSpill && hasRightSpill:
      default: {
        pages = [-1, ...pages, -1];
        break;
      }
    }

    return [1, ...pages, totalPages];
  }

  return getPageRange(1, totalPages);
};

export const Pagination = (props: PaginationProps) => {
  const {
    activePage,
    dataCount,
    onPageChange,
    size,
    pageNeighbors = 1,
    pageSize = 10,
    classes,
    hidePagination = false,
  } = props;

  const { wrapper } = classes || {};

  const totalPages = Math.ceil(dataCount / pageSize);

  const disableFirstPageIcons = activePage === 1;
  const disableLastPageIcons = activePage === totalPages;

  const pages = fetchPageNumbers({ totalPages, activePage, pageNeighbors });

  return (
    <div className={[style.customPagination, wrapper].join(' ')}>
      {!hidePagination && (
        <BootstrapPagination size={size} className={[style.pagination, 'mb-3 mb-md-0'].join(' ')}>
          <BootstrapPagination.Item
            className={[style.pageItem, style.chevronLeft, disableFirstPageIcons ? style.disabled : ''].join(' ')}
            disabled={disableFirstPageIcons}
            onClick={() => onPageChange(activePage - 1)}
          >
            <ChevronUpIcon />
          </BootstrapPagination.Item>
          {pages.map((page, pageIndex) => {
            if (page === -1) {
              return <BootstrapPagination.Ellipsis className={style.pageItem} disabled key={`${pageIndex + 1}`} />;
            }
            return (
              <BootstrapPagination.Item
                key={`${pageIndex + 1}`}
                onClick={() => onPageChange(page)}
                active={page === activePage}
                className={[style.pageItem, page === activePage ? style.active : ''].join(' ')}
              >
                {page}
              </BootstrapPagination.Item>
            );
          })}
          <BootstrapPagination.Item
            className={[style.pageItem, style.chevronRight, disableLastPageIcons ? style.disabled : ''].join(' ')}
            disabled={disableLastPageIcons}
            onClick={() => onPageChange(activePage + 1)}
          >
            <ChevronUpIcon />
          </BootstrapPagination.Item>
        </BootstrapPagination>
      )}
    </div>
  );
};

export default Pagination;
