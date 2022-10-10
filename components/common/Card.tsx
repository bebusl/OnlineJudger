import React from "react";
import styled from "styled-components";
import FlexBox from "./FlexBox";

const Card: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled(FlexBox)`
  background-color: ${({ theme }) => theme.colors.gray100};
  width: 100%;
  height: 100%;
`;

export default Card;
