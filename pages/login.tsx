import { useRouter } from "next/router";
import React, { FormEventHandler, useState } from "react";

import { loginRequest } from "../store/slice/authSlice";

import useForm from "../hooks/useFormRefactor";
import { useAppDispatch } from "../hooks/useStore";

import { regexPatterns } from "../utils/validator";

import Button from "../components/common/Buttons/BasicButton/Button";
import Input from "../components/common/Input";
import AuthTemplate from "../components/templates/AuthTemplate";
import { FlexBox, Seperator } from "../components/common";

import GoogleOAuthButton from "../components/common/Buttons/OAuthButton/GoogleOAuthButton";
import KakaoOAuthButton from "../components/common/Buttons/OAuthButton/KakaoOAuthButton";
import LinkS from "../components/common/Link/LinkS";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isValidInputs, register, getAllValues } = useForm();
  const [errMessage, setErrorMessage] = useState("");

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    dispatch(loginRequest(getAllValues()))
      .unwrap()
      .then(() => router.back());
  };

  return (
    <div style={{ width: "60%" }}>
      <FlexBox justifyContent="space-around">
        <GoogleOAuthButton />
        <KakaoOAuthButton />
      </FlexBox>
      <Seperator>또는</Seperator>
      <form onSubmit={handleSubmit}>
        <Input
          {...register("email", { pattern: regexPatterns.email })}
          placeholder="이메일"
        />
        <Input
          type="password"
          {...register("password", { pattern: regexPatterns.password })}
          placeholder="비밀번호"
        />
        <Button disabled={!isValidInputs()} width="100%">
          LOGIN
        </Button>
      </form>
      <FlexBox>
        <LinkS href="/register" text="회원가입" />
        <LinkS href="/send-message" text="비밀번호 재설정" />
      </FlexBox>
    </div>
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
