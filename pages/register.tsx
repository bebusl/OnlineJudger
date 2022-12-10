import { NextPageContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { Button, Input, Seperator } from "../components/common";
import AuthTemplate from "../components/templates/AuthTemplate";
import useForm from "../hooks/useForm";
import { signUpRequest } from "../store/slice/authSlice";
import { useAppDispatch } from "../hooks/useStore";

const RegisterForm = ({ linkKey }: { linkKey: string | undefined }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { handleBlur, isValidInputs, isValid, getRef } = useForm({
    types: ["name", "email", "password"],
  });
  const nameRef = getRef("name");
  const emailRef = getRef("email");
  const passwordRef = getRef("password");

  const checkData = async () => {
    const email = emailRef.current?.value || "";
    const name = nameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    dispatch(
      signUpRequest({
        name,
        email,
        password,
        link_key: linkKey ?? "",
      })
    )
      .unwrap()
      .then(() => router.push("/"));
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        checkData();
      }}
    >
      <Input
        name="email"
        ref={emailRef}
        isValid={isValid.email}
        onBlur={() => {
          handleBlur("email");
        }}
        placeholder="이메일"
      />
      <Input
        name="nickname"
        ref={nameRef}
        isValid={isValid.id}
        onBlur={() => handleBlur("name")}
        placeholder="닉네임"
      />
      <Input
        name="password"
        type="password"
        ref={passwordRef}
        isValid={isValid.password}
        onBlur={() => handleBlur("password")}
        placeholder="비밀번호"
      />
      <Button disabled={!isValidInputs()} onClick={checkData}>
        SIGNUP
      </Button>
    </form>
  );
};

function Register({
  provider,
  linkKey,
}: {
  provider: string | undefined;
  linkKey?: string;
}) {
  return (
    <AuthTemplate
      title="REGISTER"
      subTitle="서비스를 이용하기 위해서는 회원가입이 필요합니다"
    >
      {provider ? (
        <>
          <Image
            src={`/images/logo/${provider.toLowerCase()}-logo.png`}
            alt={`login with ${provider.toLowerCase()}`}
            height="64px"
            width="64px"
          />
          <p>{provider}와(과) 연동되는 계정입니다.</p>
        </>
      ) : (
        <p>연동된 소셜 계정이 없습니다</p>
      )}
      <Seperator>또는</Seperator>
      <RegisterForm linkKey={linkKey} />
    </AuthTemplate>
  );
}

export function getServerSideProps(ctx: NextPageContext) {
  const provider = ctx.query?.provider ?? null;
  const linkKey = ctx.query?.linkKey ?? null;

  return {
    props: {
      provider,
      linkKey,
    },
  };
}

export default Register;
