import React from "react";
import { KAKAO_AUTH_LINK_URL } from "../../../../utils/constants/url";
import OAuthLinkButton from "./OAuthLinkButton";

function KakaoOAuthButton() {
  return (
    <OAuthLinkButton
      type="kakao"
      url={KAKAO_AUTH_LINK_URL}
      subText="와 연동하기"
    />
  );
}

export default React.memo(KakaoOAuthButton);
