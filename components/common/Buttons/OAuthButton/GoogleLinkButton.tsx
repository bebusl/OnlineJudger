import React from "react";
import { GOOGLE_AUTH_LINK_URL } from "../../../../utils/constants/url";
import OAuthLinkButton from "./OAuthLinkButton";

function GoogleOAuthButton() {
  return (
    <OAuthLinkButton
      type="google"
      url={GOOGLE_AUTH_LINK_URL}
      subText="와 연동하기"
    />
  );
}

export default React.memo(GoogleOAuthButton);
