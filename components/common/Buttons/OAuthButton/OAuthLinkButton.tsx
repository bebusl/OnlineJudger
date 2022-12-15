import React from "react";
import Image from "next/image";
import { IconButton } from "../IconButton/IconButton";

const OAuthLinkButton = React.memo(
  ({ url, type }: { url: string; type: "kakao" | "github" | "google" }) => {
    OAuthLinkButton.displayName = `OAuthLinkButton`;
    return (
      <a
        href={url}
        rel="noopner noreferrer"
        target="_self"
        style={{ width: "100%" }}
      >
        <IconButton
          iconSrc={`/images/logo/${type}-logo.png`}
          text={type.toUpperCase()}
          subText="로 시작하기"
        ></IconButton>
      </a>
    );
  }
);

export default OAuthLinkButton;
