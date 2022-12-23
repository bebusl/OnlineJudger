import React, { useEffect } from "react";
import type { NextPageContext } from "next";

import { useRouter } from "next/router";
import useNotification from "../../../hooks/useNotification";
import { linkOauth } from "../../../api/authAPI";

function Oauth2Link() {
  const router = useRouter();
  const addNotification = useNotification();
  const { newUser, linkKey } = router.query;

  useEffect(() => {
    const isLinkable = newUser === "true" && typeof linkKey === "string";
    if (isLinkable) {
      (async () => {
        const response = await linkOauth(encodeURI(linkKey));
        if (response.data.success) {
          addNotification("연동에 성공했습니다", "success");
        }
      })();
    } else {
      addNotification("다른 계정과 연동된 소셜 계정입니다");
    }
    router.replace("/user");
  }, []);

  return <div>연동하는 곳!</div>;
}

export default Oauth2Link;
