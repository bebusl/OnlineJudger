import React from "react";
import styled from "styled-components";

const Subscription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[0]};
  color: ${({ theme }) => theme.colors.gray300};
  margin: 0;
`;

export default Subscription;
