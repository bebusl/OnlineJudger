import React from "react";
import { IconButton } from "../IconButton/IconButton";

interface OAuthLinkButtonProps {
  url: string;
  type: "kakao" | "github" | "google";
  subText?: string;
}

const OAuthLinkButton = React.memo(
  ({ url, type, subText = "로 시작하기" }: OAuthLinkButtonProps) => {
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
          subText={subText}
        />
      </a>
    );
  }
);

export default OAuthLinkButton;
