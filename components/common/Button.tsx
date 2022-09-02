import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 320px;
  min-height: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

export default Button;
