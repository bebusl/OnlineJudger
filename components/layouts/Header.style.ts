import styled from "styled-components";
export const Container = styled.header`
  width: 1200px;
  height: 80px;
  flex-grow: 0;
  padding: 9px 3px 7px 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

export const Logo = styled.span`
  width: 67px;
  height: 42px;
  margin: 10px 39px 12px 0;
  font-family: Nunito;
  font-size: 21px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: 0.3px;
  text-align: left;
  color: ${({ theme }) => theme.colors.black};
`;
