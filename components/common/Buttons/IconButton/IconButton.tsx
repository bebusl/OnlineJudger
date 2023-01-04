import React, { MouseEventHandler } from "react";
import Image from "next/image";
import * as S from "./IconButton.style";

interface IconButtonProps {
  iconSrc?: string;
  text: string;
  subText: string;
  onClick?: MouseEventHandler;
  isActive?: boolean;
}

export const IconButton = ({
  iconSrc,
  text = "",
  subText = "",
  onClick,
  isActive,
}: IconButtonProps) => (
  <S.Wrapper onClick={onClick} isActive={!!isActive}>
    <div>
      {iconSrc && <Image src={iconSrc} width="40px" height="40px" alt="icon" />}
    </div>
    <div>
      <S.Text>{text}</S.Text>
      <S.SubText>{subText}</S.SubText>
    </div>
  </S.Wrapper>
);
