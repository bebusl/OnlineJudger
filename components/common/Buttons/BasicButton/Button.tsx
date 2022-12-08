import React from "react";
import styled from "styled-components";

interface ButtonProps {
  disabled?: boolean;
  $variant?: "outline" | "full";
  width?: number | string;
  height?: number | string;
}

const Button = styled.button<ButtonProps>`
  width: fit-content;
  padding: 0.5rem;
  // height: ${({ height }) => height};
  ${({ $variant, theme }) => {
    if ($variant === "full") {
      return `background-color:${theme.colors.primary};color:${theme.colors.white};border:none;`;
    } else
      return `background-color:${theme.colors.white};border:1px solid ${theme.colors.primary};color:${theme.colors.primary};`;
  }}
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    opacity: 0.1;
    cursor: not-allowed;
  }
`;

Button.defaultProps = {
  width: "320px",
  height: "50px",
  $variant: "full",
};

export default Button;
