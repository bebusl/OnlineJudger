import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ACCESS_TOKEN, LINK_KEY } from "../../../utils/constants/url";

function Oauth2Redirect({
  isNew,
  linkKey,
  error,
  provider,
}: {
  isNew: string;
  linkKey: string;
  error: string;
  provider: string;
}) {
  const router = useRouter();

  useEffect(() => {
    console.log("call useEffect");
    if (isNew) {
      localStorage.setItem(LINK_KEY, linkKey);
      router.push({
        pathname: "/register",
        query: { prev: "oauth2", linkKey, provider },
      });
    } else if (linkKey) {
      localStorage.setItem(ACCESS_TOKEN, linkKey);
      router.push({ pathname: "", query: { linkKey } });
    } else {
      router.push({ pathname: "/login", query: { error } });
    }
  }, []);

  return <div>인증 절차가 완료되었습니다...</div>;
}

export function getServerSideProps(ctx: NextPageContext) {
  const isNew = ctx.query?.newUser ?? "";
  const linkKey = ctx.query?.linkKey ?? "";
  const error = ctx.query?.error ?? "";
  const provider = ctx.query?.provider;

  return {
    props: {
      isNew,
      linkKey,
      error,
      provider,
    },
  };
}

export default Oauth2Redirect;
