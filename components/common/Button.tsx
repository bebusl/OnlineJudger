import Image from "next/image";
import React, { forwardRef } from "react";
import styled from "styled-components";

const misteryManSrc =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const Button = styled.button<{ disabled?: boolean }>`
  width: 320px;
  min-height: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:disabled {
    opacity: 0.1;
    cursor: not-allowed;
  }
`;

interface IconButtonProps {
  iconSrc?: string;
  text: string;
  subText: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
}

export const IconButton = ({
  iconSrc = misteryManSrc,
  text,
  subText,
  onClick,
  isActive,
}: IconButtonProps) => (
  <Button
    style={
      isActive
        ? {
            display: "flex",
            borderRadius: "15px",
            border: "1px solid #6358dc",
            backgroundColor: "#d5d9ff",
          }
        : {
            display: "flex",
            borderRadius: "15px",
            border: "1px solid #ededed",
            backgroundColor: "#fff",
          }
    }
    onClick={onClick}
  >
    <div style={{ flex: 1, padding: "5%" }}>
      <Image
        src={iconSrc}
        alt="profileImg"
        width="100%"
        height="100%"
        style={{ borderRadius: "50%" }}
      />
    </div>
    <div style={{ flex: 2, margin: "auto 0" }}>
      <h4 style={{ textAlign: "left", margin: 0, color: "#000" }}>{text}</h4>
      <p
        style={{
          fontSize: "0.5rem",
          textAlign: "left",
          color: "#b6b6b6",
          margin: 0,
        }}
      >
        {subText}
      </p>
    </div>
  </Button>
);

export default Button;
