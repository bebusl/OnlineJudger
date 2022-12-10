import styled from "styled-components";
import { variantType } from "../../../styles/theme";

const Card = styled.div<{ $variant: variantType }>`
  width: 100%;
  height: 100%;
  padding: 10px 0;
  margin: 5px auto;
  text-align: center;
  border-radius: 10px;
  box-shadow: 5px 5px 5px ${({ theme }) => theme.colors.gray200};
  border: 1px solid ${({ theme, $variant }) => theme.colors[$variant]};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes[1]};
`;
export default Card;
