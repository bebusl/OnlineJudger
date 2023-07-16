import styled from "styled-components";
import FlexBox from "../FlexBox";

export const Wrapper = styled(FlexBox).attrs({ as: "article" })`
  min-width: 18.75rem;
  min-height: 9.375rem;
  div:first-child {
    flex: 3;
  }
  div:nth-child(2) {
    flex: 1;
  }
`;

export const MessageBox = styled(FlexBox)`
  white-space: pre-line;
  text-align: center;
`;
