import React from "react";
import styled from "styled-components";

interface ButtonProps {
  disabled?: boolean;
  $variant?: "outline" | "full";
  width?: number | string;
  height?: number | string;
}

const Button = styled.button<ButtonProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 0.5rem;
  ${({ $variant, theme }) =>
    $variant === "full"
      ? `background-color:${theme.colors.primary};color:${theme.colors.white};border:none;`
      : `background-color:${theme.colors.white};border:1px solid ${theme.colors.primary};color:${theme.colors.primary};`}
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    opacity: 0.1;
    cursor: not-allowed;
  }
`;

Button.defaultProps = {
  width: "fit-content",
  height: "fit-content",
  $variant: "full",
};

export default Button;
