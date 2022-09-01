import Image from "next/image";
import React from "react";
import AuthTemplate from "../../components/templates/AuthTemplate";
import {
  GITHUB_AUTH_URL,
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
} from "../../utils/constants/url";

const OAuthLinkButton = ({
  url,
  type,
}: {
  url: string;
  type: "kakao" | "github" | "google";
}) => (
  <a href={url} rel="noopner noreferrer" target="_blank">
    <Image
      src={`/images/logo/${type}-logo.png`}
      alt={`login with ${type}`}
      height="64px"
      width="64px"
    />
  </a>
);

function Login() {
  return (
    <AuthTemplate>
      <OAuthLinkButton url={GOOGLE_AUTH_URL} type="google" />
      <OAuthLinkButton url={KAKAO_AUTH_URL} type="kakao" />
      <OAuthLinkButton url={GITHUB_AUTH_URL} type="github" />
    </AuthTemplate>
  );
}

export default Login;
