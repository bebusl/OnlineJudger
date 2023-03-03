import styled from "styled-components";
import Button from "../BasicButton/Button";

export const Wrapper = styled(Button)<{
  isActive: boolean;
}>`
  display: flex;
  width: 100%;
  ${({ isActive }) =>
    isActive
      ? "border: 1px solid #6358dc; background-color: #d5d9ff;"
      : "border: 1px solid #ededed; background-color: #ffffff;"}
  div:first-child {
    flex: 1;
  }
  div:nth-child(2) {
    flex: 2;
    margin: auto 0;
  }
`;

export const Text = styled.p`
  text-align: left;
  margin: 0;
  color: ${({ theme }) => theme.colors.gray600};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const SubText = styled.p`
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.fontSizes[0]};
  text-align: left;
  margin: 0;
`;
