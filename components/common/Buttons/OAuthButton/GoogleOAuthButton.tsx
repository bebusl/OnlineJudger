import React from "react";
import { GOOGLE_AUTH_REGISTER_URL } from "../../../../constants/url";
import OAuthLinkButton from "./OAuthLinkButton";

function GoogleOAuthButton() {
  return <OAuthLinkButton type="google" url={GOOGLE_AUTH_REGISTER_URL} />;
}

export default React.memo(GoogleOAuthButton);
