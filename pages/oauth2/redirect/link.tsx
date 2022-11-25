import React, { useEffect } from "react";
import type { NextPageContext } from "next";
import { LINK_KEY } from "../../../constants/url";

import { loginRequest } from "../../../store/slice/authSlice";

import { useRouter } from "next/router";
import { useAppDispatch } from "../../../hooks/useStore";
import useNotification from "../../../hooks/useNotification";
import { linkOauth } from "../../../api/authAPI";

function Oauth2Link({
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

  console.log("?!", isNew, linkKey, error, provider);

  useEffect(() => {
    if (isNew) {
      (async () => {
        const response = await linkOauth(encodeURI(linkKey));
        console.log(response.data.success);
        if (response.data.success) {
          addNotification("연동에 성공했습니다.", "success");
          router.replace("/user");
        }
      })();
      // router.replace("/user");
    } else {
      addNotification("이미 있는 ", "error");
      // router.replace("/");
    }
  }, []);

  return <div>연동하는 곳!</div>;
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

export default Oauth2Link;
