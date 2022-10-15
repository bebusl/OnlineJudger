import Image from "next/image";
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

interface IconButtonProps {
  iconSrc: string;
  text: string;
  subText: string;
}

export const IconButton = ({ iconSrc, text, subText }: IconButtonProps) => (
  <Button
    style={{
      display: "flex",
      borderRadius: "15px",
      backgroundColor: "#ededed",
    }}
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
      <h4 style={{ textAlign: "left", margin: 0 }}>{text}</h4>
      <p style={{ fontSize: "0.5rem", textAlign: "left", margin: 0 }}>
        {subText}
      </p>
    </div>
  </Button>
);

export default Button;
