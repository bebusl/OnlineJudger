import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../hooks/useStore";
import useNotification from "../../hooks/useNotification";

import { getAuthToken } from "../../utils/authUtils";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  function AuthenticatedComponent(props: Record<string, unknown>) {
    const router = useRouter();
    const addNotification = useNotification();
    const { isAuthenticating, isLogin } = useAppSelector((state) => state.auth);
    const accessToken = getAuthToken();
    useEffect(() => {
      if (!isAuthenticating && !isLogin && !accessToken) {
        addNotification("로그인이 필요한 서비스입니다", "error");

        router.replace("/login");
      }
    }, [isLogin, isAuthenticating, accessToken, router, addNotification]);

    if (isAuthenticating) {
      return <div>인증중</div>;
    }

    return <WrappedComponent {...props} />;
  }
  AuthenticatedComponent.displayName = "authenticated-";
  return AuthenticatedComponent;
};

export default withAuth;
