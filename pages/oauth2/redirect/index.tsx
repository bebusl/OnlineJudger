import React, { useEffect } from "react";
import type { NextPageContext } from "next";
import { LINK_KEY } from "../../../constants/url";

import { loginRequest } from "../../../store/slice/authSlice";

import { useRouter } from "next/router";
import { useAppDispatch } from "../../../hooks/useStore";
import useNotification from "../../../hooks/useNotification";

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
  const dispatch = useAppDispatch();
  const addNotification = useNotification();

  useEffect(() => {
    if (isNew) {
      localStorage.setItem(LINK_KEY, linkKey);
      router.push(
        {
          pathname: "/register",
          query: { prev: "oauth2", linkKey, provider },
        },
        "/register"
      );
    } else if (linkKey) {
      dispatch(loginRequest({ email: "", password: "", link_key: linkKey }))
        .unwrap()
        .then(() => {
          router.push("/");
        });
    } else {
      router.push({ pathname: "/login", query: { error } });
    }
  }, []);

  return <div>인증 절차가 완료되었습니다...</div>;
}

export function getServerSideProps(ctx: NextPageContext) {
  const isNew = ctx.query?.newUser;
  const linkKey = ctx.query?.linkKey ?? "";
  const error = ctx.query?.error ?? "";
  const provider = ctx.query?.provider;
  return {
    props: {
      isNew: isNew === "true" ? true : false,
      linkKey,
      error,
      provider,
    },
  };
}

export default Oauth2Redirect;
