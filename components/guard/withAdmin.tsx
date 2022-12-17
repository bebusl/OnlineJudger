import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../hooks/useStore";
import useNotification from "../../hooks/useNotification";

import { ROLEADMIN } from "../../utils/constants/role";
import { getAuthToken } from "../../utils/authUtils";

const withAdmin = (WrappedComponent: React.ComponentType<Record<string, unknown>>) => {
  function AuthenticatedComponent(props: Record<string, unknown>) {
    const router = useRouter();
    const addNotification = useNotification();
    const { isLogin, roles, isAuthenticating } = useAppSelector((state) => state.auth);
    const [mounted, setMounted] = useState(false);

    const authToken = getAuthToken();

    useEffect(() => {
      setMounted(true);
    }, []);

    if (mounted) {
      if (isAuthenticating) return <div>권한 확인중..</div>;
      if (!isAuthenticating && !isLogin) {
        addNotification("관리자 로그인이 필요합니다", "error");
        router.back();
      }
      if (!isAuthenticating && isLogin && roles?.includes(ROLEADMIN)) {
        return <WrappedComponent {...props} />;
      }
      // if (isLogin && roles?.includes(ROLEADMIN))
      //   return <WrappedComponent {...props} />;
      addNotification("관리자 권한이 없습니다", "error");
      router.push("/login");
      // addNotification("관리자 권한이 없습니다.", "error");
      // router.replace("/");
    }
    return null;
    //여기 로딩을 넣어볼까!
  }
  AuthenticatedComponent.displayName = "authenticated-component";
  return AuthenticatedComponent;
};

export default withAdmin;
