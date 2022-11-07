import Link from "next/link";
import React, { useMemo } from "react";
import styled from "styled-components";

interface Props {
  route: string;
  current_pages: number;
  total_pages: number;
}

function Pagination({ route, current_pages, total_pages }: Props) {
  // const total_pages = 26; if you want test pagination
  const paginationIndex = Math.floor((current_pages - 1) / 5);
  const enablePrev = useMemo(() => paginationIndex !== 0, [paginationIndex]);
  const enableNext = useMemo(
    () => paginationIndex !== Math.floor(total_pages / 5),
    [paginationIndex, total_pages]
  );
  const pageNumbers = [];

  if (enableNext)
    pageNumbers.push(
      ...[1, 2, 3, 4, 5].map((number) => 5 * paginationIndex + number)
    );
  else {
    const lastPageIndex = total_pages % 5;
    for (let i = 0; i < lastPageIndex; i++) {
      pageNumbers.push(5 * paginationIndex + i + 1);
    }
  }
  return (
    <Wrapper>
      {enablePrev && (
        <Link
          href={`${route}?page=${
            current_pages - 5 < 1 ? 1 : current_pages - 5
          }`}
          passHref
          legacyBehavior
        >
          <PaginationNavButton>{"<"}</PaginationNavButton>
        </Link>
      )}
      <PageNumbers>
        {pageNumbers.map((number) => {
          const isCurrentPage = number == current_pages;
          return (
            <Link href={`${route}?page=${number}`} key={number}>
              <a className={isCurrentPage ? "active" : ""}> {number}</a>
            </Link>
          );
        })}
      </PageNumbers>
      {enableNext && (
        <Link
          href={`${route}?page=${
            current_pages + 5 > total_pages ? total_pages : current_pages + 5
          }`}
          passHref
          legacyBehavior
        >
          <PaginationNavButton>{">"}</PaginationNavButton>
        </Link>
      )}
    </Wrapper>
  );
}

export default Pagination;

const PageNumbers = styled.div`
  background-color: ${({ theme }) => theme.colors.gray150};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.gray600};
  & > a {
    background-color: ${({ theme }) => theme.colors.gray150};
    padding: 3px;
    text-align: center;
  }
  & > a.active {
    background-color: ${({ theme }) => theme.colors.gray500};
    border-radius: 5px;
    color: white;
  }
`;

const PaginationNavButton = styled.a`
  border-radius: 50px;
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${({ theme }) => theme.colors.gray150};
  color: ${({ theme }) => theme.colors.gray600};
  text-align: center;
  line-height: 1.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 15px;
  margin: 2rem;
`;
