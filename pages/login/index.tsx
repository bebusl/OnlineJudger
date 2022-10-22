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
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAuthDispatch();
  const router = useRouter();

  const passwordValidator = (value: string) => {
    const passwordRegex =
      /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    const result = passwordRegex.test(value);
    console.log("RESULT ::: ", result);
    return result;
  };

  const emailValidator = (value: string) => {
    const emailRegex =
      /[a-zA-Z0-9]+([-_\.][a-zA-Z0-9]*)*@[a-zA-Z]{3,}\.[a-z]{2,4}/;
    const result = emailRegex.test(value);
    return result;
  };

  const [isDirtyField, setDirtyField] = useState({
    id: false,
    password: false,
  });
  const [isValid, setIsValid] = useState({ id: true, password: true });

  const isValidInputs = () => {
    const a = Object.values(isDirtyField).every((field) => field);
    const b = Object.values(isValid).every((field) => field);
    return a && b;
  };

  const checkData = async () => {
    const id = idRef.current?.value;
    const password = passwordRef.current?.value;
    if (id && password) {
      dispatch(loginRequest({ id, password }))
        .unwrap()
        .then(() => router.push("/"))
        .catch((e) => console.log("ERROR", e));
    }
  };
  return (
    <>
      <OAuthLinkButton url={GOOGLE_AUTH_URL} type="google" />
      <OAuthLinkButton url={KAKAO_AUTH_URL} type="kakao" />
      <OAuthLinkButton url={GITHUB_AUTH_URL} type="github" />
      <Input
        name="id"
        ref={idRef}
        validator={emailValidator}
        isValid={isValid.id}
        onBlur={(value) => {
          setIsValid({ ...isValid, id: value as boolean });
          setDirtyField((prev) => ({
            ...prev,
            id: "" !== idRef.current?.value,
          }));
        }}
      />
      <Input
        name="password"
        type="password"
        ref={passwordRef}
        isValid={isValid.password}
        validator={passwordValidator}
        onBlur={(value) => {
          setIsValid({ ...isValid, password: value as boolean });
          setDirtyField((prev) => ({
            ...prev,
            password: "" !== passwordRef.current?.value,
          }));
        }}
      />
      <Button disabled={!isValidInputs()} onClick={checkData}>
        LOGIN
      </Button>
    </>
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
