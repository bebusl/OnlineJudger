import styled from "styled-components";
import { FlexBox } from "../../../common";

const Header = styled(FlexBox).attrs({ as: "nav" })`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.gray100};
  padding: 0 60px;
  h1 {
    font-size: ${({ theme }) => theme.fontSizes[3]};
  }
`;

export default Header;
