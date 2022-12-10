import Image from "next/image";
import { useRouter } from "next/router";

import React, { useRef } from "react";

import useForm from "../hooks/useForm";
import { useAppDispatch } from "../hooks/useStore";
import { loginRequest } from "../store/slice/authSlice";

import Button from "../components/common/Buttons/BasicButton/Button";
import Input from "../components/common/Input";
import AuthTemplate from "../components/templates/AuthTemplate";
import { FlexBox, Seperator } from "../components/common";

import {
  GOOGLE_AUTH_REGISTER_URL,
  KAKAO_AUTH_REGISTER_URL,
} from "../constants/url";
import Link from "next/link";

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
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    dispatch(loginRequest({ email, password }))
      .unwrap()
      .then(() => router.back());
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
      <Input
        name="email"
        ref={emailRef}
        isValid={!!emailRef.current?.value.length || isValid.email}
        onChange={() => handleBlur("email", true)}
        placeholder="이메일"
      />
      <Input
        name="password"
        type="password"
        ref={passwordRef}
        isValid={!!passwordRef.current?.value.length || isValid.password}
        onChange={() => handleBlur("password", true)}
        placeholder="비밀번호"
      />
      <Button disabled={!isValidInputs()}>LOGIN</Button>
      <Seperator>또는</Seperator>
      <FlexBox>
        <Link href="/register">회원가입</Link>
        <Link href="/send-message">비밀번호 재설정</Link>
      </FlexBox>
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
