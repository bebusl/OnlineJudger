import React, { MouseEventHandler, useMemo } from "react";
import styled from "styled-components";

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

  let pageNumbers = [];

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
    <Wrapper aria-label="pagination navigation" onClick={handleClickPageBtn}>
      {hasPrev && (
        <PaginationNavButton
          data-page={current_pages - LIMIT < 1 ? 1 : current_pages - LIMIT}
        >
          {"<"}
        </PaginationNavButton>
      )}
      <PageNumbers>
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
      </PageNumbers>
      {hasNext && (
        <PaginationNavButton
          data-page={
            current_pages + LIMIT > total_pages
              ? total_pages
              : current_pages + LIMIT
          }
        >
          {">"}
        </PaginationNavButton>
      )}
    </Wrapper>
  );
}

export default Pagination;

const PageNumbers = styled.div`
  background-color: ${({ theme }) => theme.colors.gray150};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.gray600};
  & > div {
    display: inline-block;
    background-color: ${({ theme }) => theme.colors.gray150};
    padding: 3px;
    text-align: center;
    cursor: pointer;
  }
  & > div.active {
    background-color: ${({ theme }) => theme.colors.gray500};
    border-radius: 5px;
    color: white;
  }
`;

const PaginationNavButton = styled.div`
  border-radius: 50px;
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${({ theme }) => theme.colors.gray150};
  color: ${({ theme }) => theme.colors.gray600};
  text-align: center;
  line-height: 1.5rem;
  cursor: pointer;
`;

const Wrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 2rem auto;
`;
