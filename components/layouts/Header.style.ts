import styled from "styled-components";
export const Container = styled.div`
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
    color: ${({ theme }) => theme.colors.gray300};
  }
`;
