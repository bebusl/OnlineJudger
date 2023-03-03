import styled, { keyframes } from "styled-components";
import { variantType } from "../../../styles/theme";

export const slideInandOut = keyframes`
0%{
  opacity:0;
}
10%,90%{
  opacity: 1;
}
100%{
  opacity: 0;
}
  
`;

export const Card = styled.div<{ $variant: variantType }>`
  width: fit-content;
  min-width: 250px;
  padding: 10px 0;
  margin: 5px auto;
  text-align: center;
  border-radius: 10px;
  box-shadow: 5px 5px 5px ${({ theme }) => theme.colors.gray200};
  border: 1px solid ${({ theme, $variant }) => theme.colors[$variant]};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  animation-name: ${slideInandOut};
  animation-duration: 3s;
  animation-fill-mode: forwards;
`;

export const NotiContainer = styled.aside`
  width: fit-content;
  margin: auto;
  position: fixed;
  top: 0;
  left: calc(50% - 125px);
`;
