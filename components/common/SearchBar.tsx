import styled from "styled-components";

import React, { FormEventHandler } from "react";
import Image from "next/image";

interface SearchBarProps {
  onSubmit: FormEventHandler;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  return (
    <SearchBarWrapper onSubmit={onSubmit}>
      <input type="text" name="title" placeholder="제목을 검색합니다" />
      <button type="submit">
        <Image
          src="/images/icon_search/_search@3x.webp"
          alt="Search Icon"
          width="100%"
          height="100%"
        />
      </button>
    </SearchBarWrapper>
  );
}

export default SearchBar;

export const SearchBarWrapper = styled.form`
  width: 370px;
  height: 40px;
  flex-grow: 0;
  padding: 10px 12px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray100};
  display: flex;

  & > button {
    width: 30px;
    height: 30px;

    object-fit: contain;
    background-color: inherit;
    box-shadow: none;
    border: none;
  }
  & > input {
    background-color: inherit;
    border: none;
    width: 310px;
    height: 20px;
    margin: 0 20px 0 0;
    font-family: Nunito;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: 0.1px;
    text-align: left;
    color: ${({ theme }) => theme.colors.gray600};
  }
`;
