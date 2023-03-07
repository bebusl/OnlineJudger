import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  height: 350px;
  position: relative;
  background-color: inherit;
  > button {
    position: absolute;
    background-color: inherit;
    color: white;
    height: 100%;
    top: 0;
    z-index: 3;
  }
  & > button:hover {
    background-color: #ffffff50;
  }
  > button.arrow-left {
    left: 0;
  }
  > button.arrow-right {
    right: 0;
  }
  ${({ theme }) => theme.mediaQueries.desktop} {
    display: none;
  }
`;

export const Button = styled.button`
  background-color: none;
  border: none;
`;

export const Window = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  height: 350px;
  > * {
    flex-shrink: 0;
    width: 100%;
  }
`;
