import React, { useEffect } from "react";

import { loginRequest } from "../../../store/slice/authSlice";

import { useRouter } from "next/router";
import { useAppDispatch } from "../../../hooks/useStore";
import useNotification from "../../../hooks/useNotification";

function Oauth2Redirect() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const addNotification = useNotification();

  useEffect(() => {
    const isDetectQuery = !!Object.keys(router.query).length;
    if (isDetectQuery) {
      const { newUser, linkKey, provider } = router.query;
      const isNew = newUser === "true" && typeof linkKey === "string";

      if (isNew) {
        router.replace(
          {
            pathname: "/register",
            query: { prev: "oauth2", linkKey, provider },
          },
          "/register"
        );
      } else if (linkKey && typeof linkKey === "string") {
        dispatch(loginRequest({ email: "", password: "", link_key: linkKey }))
          .unwrap()
          .then(() => {
            router.replace("/");
          })
          .catch((e) => {
            router.replace("/login");
          });
        // 인증 절차 실패했을때도 대비해야함..!
      }
    } else {
      addNotification(
        "인증 과정 중에 에러가 발생했습니다. 다시 시도해주세요.",
        "error"
      );
    }
  }, [router.query, addNotification, dispatch, router]);

  return <div>인증 절차를 진행중입니다...</div>;
}

export default Oauth2Redirect;
