import React, { useEffect } from "react";
import type { NextPageContext } from "next";

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
  const addNotification = useNotification();
  useEffect(() => {
    if (isNew) {
      (async () => {
        const response = await linkOauth(encodeURI(linkKey));
        if (response.data.success) {
          addNotification("연동에 성공했습니다.", "success");
          router.replace("/user");
        }
      })();
    } else {
      addNotification("다른 계정과 연동된 소셜 계정입니다.", "error");
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
