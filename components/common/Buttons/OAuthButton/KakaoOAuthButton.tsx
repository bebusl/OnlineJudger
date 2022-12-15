import React from "react";
import { KAKAO_AUTH_REGISTER_URL } from "../../../../constants/url";
import OAuthLinkButton from "./OAuthLinkButton";

function KakaoOAuthButton() {
  return <OAuthLinkButton type="kakao" url={KAKAO_AUTH_REGISTER_URL} />;
}

export default React.memo(KakaoOAuthButton);
