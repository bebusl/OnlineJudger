import React, { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { signUpRequest } from "../store/slice/authSlice";

import { useAppDispatch } from "../hooks/useStore";
import useForm from "../hooks/useFormRefactor";

import AuthTemplate from "../components/templates/AuthTemplate";
import { Button, FlexBox, Input, Seperator } from "../components/common";
import { regexPatterns } from "../utils/validator";
import Subscription from "../components/common/Typhography/Description";
import GoogleOAuthButton from "../components/common/Buttons/OAuthButton/GoogleOAuthButton";
import KakaoOAuthButton from "../components/common/Buttons/OAuthButton/KakaoOAuthButton";

const RegisterForm = ({
  linkKey,
}: {
  linkKey: string | string[] | undefined;
}) => {
  const dispatch = useAppDispatch();
  const { getAllValues, register, isValidInputs } = useForm();
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (!Array.isArray(linkKey)) {
      const { checkPassword, ...rest } = getAllValues();
      dispatch(signUpRequest({ ...rest, link_key: linkKey || "" }))
        .unwrap()
        .catch((e) => setErrMsg(e));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!linkKey && (
        <Input
          {...register("email", { pattern: regexPatterns.email })}
          placeholder={"이메일"}
          description="이메일 형태로 입력해주세요"
        />
      )}
      <Input
        {...register("name", { minLength: 3 })}
        placeholder="닉네임"
        description="3글자 이상"
      />
      <Input
        type="password"
        {...register("password", { pattern: regexPatterns.password })}
        placeholder="비밀번호"
        description="6~12글자 사이 영어 숫자 혼합"
      />
      <Input
        type="password"
        {...register("checkPassword", {
          validate: (value) => {
            return value === getAllValues().password;
          },
        })}
        placeholder="비밀번호 확인"
        errorMessage="비밀번호가 일치하지 않습니다"
      />
      <Subscription>{errMsg}</Subscription>
      <Button disabled={!isValidInputs()} onClick={handleSubmit} width="100%">
        SIGNUP
      </Button>
    </form>
  );
};

function Register() {
  const router = useRouter();
  const { provider, linkKey } = router.query;

  return (
    <AuthTemplate
      title="REGISTER"
      subTitle="서비스를 이용하기 위해서는 회원가입이 필요합니다"
    >
      <div style={{ width: "60%" }}>
        <FlexBox justifyContent="space-around">
          {provider && typeof provider === "string" ? (
            <>
              <Image
                src={`/images/logo/${provider.toLowerCase()}-logo.png`}
                alt={`login with ${provider.toLowerCase()}`}
                height="40px"
                width="40px"
              />
              <p>{provider}와(과) 연동되는 계정입니다.</p>
              <Seperator>and</Seperator>
            </>
          ) : (
            <>
              <GoogleOAuthButton />
              <KakaoOAuthButton />
              <Seperator>or</Seperator>
            </>
          )}
        </FlexBox>
        <RegisterForm linkKey={linkKey} />
      </div>
    </AuthTemplate>
  );
}

export default Register;
