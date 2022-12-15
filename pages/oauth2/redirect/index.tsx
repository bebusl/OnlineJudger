import React, { useEffect } from "react";

import { loginRequest } from "../../../store/slice/authSlice";

import { useRouter } from "next/router";
import { useAppDispatch } from "../../../hooks/useStore";

function Oauth2Redirect() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { newUser, linkKey, error, provider } = router.query;

  useEffect(() => {
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
        });
    } else {
      router.replace({ pathname: "/login", query: { error } });
    }
  }, []);

  return <div>인증 절차가 완료되었습니다...</div>;
}

export default Oauth2Redirect;
