import { NextPageContext } from "next";
import Image from "next/image";
import React, { useRef } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import AuthTemplate from "../../components/templates/AuthTemplate";

function Register({ provider }: { provider: string | undefined }) {
  const nicknameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Input name="nickname" ref={nicknameRef} />
        <Input name="id" ref={idRef} />
        <Input name="password" ref={passwordRef} />
        <Button type="submit">SIGNUP</Button>
      </form>
    </AuthTemplate>
  );
}

export function getServerSideProps(ctx: NextPageContext) {
  const provider = ctx.query?.provider ?? null;

  return {
    props: {
      provider,
    },
  };
}

export default Register;
