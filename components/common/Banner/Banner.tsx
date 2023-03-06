import Image from "next/image";
import React from "react";
import * as S from "./Banner.style";

interface BannerProps {
  tag: string;
  headline: string;
  desc: string;
  src: string;
  background: string;
}

function Banner({ tag, headline, desc, src, background }: BannerProps) {
  return (
    <S.Card background={background}>
      <S.LeftBox>
        <S.Tag>{tag}</S.Tag>
        <h1>{headline}</h1>
        <h2>{desc}</h2>
      </S.LeftBox>
      <S.RightBox>
        <Image
          src={src}
          height="350px"
          alt="banner image"
          layout="fill"
          objectFit="contain"
        />
      </S.RightBox>
    </S.Card>
  );
}

export default Banner;
