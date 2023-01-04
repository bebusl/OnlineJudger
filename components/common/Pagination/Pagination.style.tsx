import styled from "styled-components";

export const Wrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 2rem auto;
`;

export const PageNumbers = styled.div`
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

export const PaginationNavButton = styled.div`
  border-radius: 50px;
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${({ theme }) => theme.colors.gray150};
  color: ${({ theme }) => theme.colors.gray600};
  text-align: center;
  line-height: 1.5rem;
  cursor: pointer;
`;
