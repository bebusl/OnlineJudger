import React, { MouseEventHandler, useMemo } from "react";
import * as S from "./Pagination.style";
interface Props {
  current_pages: number;
  total_pages: number;
  onChange: Function;
}

const LIMIT = 5;

function Pagination({ current_pages, total_pages, onChange }: Props) {
  const paginationIndex = useMemo(
    () => Math.floor((current_pages - 1) / 5),
    [current_pages]
  );
  const hasPrev = useMemo(() => paginationIndex !== 0, [paginationIndex]);
  const hasNext = useMemo(
    () => paginationIndex !== Math.floor(total_pages / LIMIT),
    [paginationIndex, total_pages]
  );

  let pageNumbers: number[] = [];

  if (hasNext)
    pageNumbers = [1, 2, 3, 4, 5].map((number) => 5 * paginationIndex + number);
  else {
    const restPages = total_pages % 5;
    for (let i = 1; i <= restPages; i++) {
      pageNumbers.push(5 * paginationIndex + i);
    }
  }

  const handleClickPageBtn: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLAnchorElement;
    const selectedPageNumber = target.dataset.page;
    onChange(selectedPageNumber);
  };

  if (total_pages === 0) return null;

  return (
    <S.Wrapper aria-label="pagination navigation" onClick={handleClickPageBtn}>
      {hasPrev && (
        <S.PaginationNavButton
          data-page={current_pages - LIMIT < 1 ? 1 : current_pages - LIMIT}
        >
          {"<"}
        </S.PaginationNavButton>
      )}
      <S.PageNumbers>
        {pageNumbers.map((number) => {
          const isCurrentPage = number === current_pages;
          return (
            <div
              className={isCurrentPage ? "active" : ""}
              data-page={number}
              key={number}
            >
              {number}
            </div>
          );
        })}
      </S.PageNumbers>
      {hasNext && (
        <S.PaginationNavButton
          data-page={
            current_pages + LIMIT > total_pages
              ? total_pages
              : current_pages + LIMIT
          }
        >
          {">"}
        </S.PaginationNavButton>
      )}
    </S.Wrapper>
  );
}

export default Pagination;
