import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import AuthTemplate from "../components/templates/AuthTemplate";
import { loginRequest } from "../store/slice/authSlice";
import { useAppDispatch } from "../hooks/useStore";
import {
  GOOGLE_AUTH_REGISTER_URL,
  KAKAO_AUTH_REGISTER_URL,
} from "../constants/url";
import useForm from "../hooks/useForm";
import { FlexBox } from "../components/common";

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
  const dispatch = useAppDispatch();
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
      <FlexBox flexDirection="row" justifyContent="space-around">
        <OAuthLinkButton url={GOOGLE_AUTH_REGISTER_URL} type="google" />
        <OAuthLinkButton url={KAKAO_AUTH_REGISTER_URL} type="kakao" />
      </FlexBox>
      <Input name="email" ref={emailRef} onBlur={() => handleBlur("email")} />
      <Input
        name="password"
        type="password"
        ref={passwordRef}
        isValid={isValid.password}
        onBlur={() => handleBlur("password", true)}
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
