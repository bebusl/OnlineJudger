import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import AuthTemplate from "../../components/templates/AuthTemplate";
import { loginRequest } from "../../store/slice/authSlice";
import { useAuthDispatch } from "../../store/useStore";
import {
  GITHUB_AUTH_URL,
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
} from "../../constants/url";
import useForm from "../../hooks/useForm";

const OAuthLinkButton = React.memo(
  ({ url, type }: { url: string; type: "kakao" | "github" | "google" }) => {
    OAuthLinkButton.displayName = `OAuthLinkButton`;
    return (
      <a href={url} rel="noopner noreferrer" target="_self">
        <Image
          src={`/images/logo/${type}-logo.png`}
          alt={`login with ${type}`}
          height="64px"
          width="64px"
        />
      </a>
    );
  }
);

const LoginForm = () => {
  const dispatch = useAuthDispatch();
  const router = useRouter();
  const { handleBlur, isValidInputs, isValid, getRef } = useForm({
    types: ["email", "password"],
  });
  const emailRef = getRef("email");
  const passwordRef = getRef("password");

  const checkData = async () => {
    const id = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    dispatch(loginRequest({ id, password }))
      .unwrap()
      .then(() => router.push("/"))
      .catch((e) => console.log("ERROR", e));
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        checkData();
      }}
    >
      <OAuthLinkButton url={GOOGLE_AUTH_URL} type="google" />
      <OAuthLinkButton url={KAKAO_AUTH_URL} type="kakao" />
      <OAuthLinkButton url={GITHUB_AUTH_URL} type="github" />
      <Input
        name="email"
        ref={emailRef}
        isValid={isValid.email}
        onBlur={() => handleBlur("email")}
      />
      <Input
        name="password"
        type="password"
        ref={passwordRef}
        isValid={isValid.password}
        onBlur={() => handleBlur("password")}
      />
      <Button disabled={!isValidInputs()}>LOGIN</Button>
    </form>
  );
};

function Login() {
  return (
    <AuthTemplate>
      <LoginForm />
    </AuthTemplate>
  );
}

export default Login;
