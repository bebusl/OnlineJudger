import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../hooks/useStore";
import useNotification from "../../hooks/useNotification";

import { ROLEADMIN } from "../../utils/constants/role";

const withAdmin = (WrappedComponent: React.ComponentType<any>) => {
  function AuthenticatedComponent(props: Record<string, unknown>) {
    const router = useRouter();
    const addNotification = useNotification();
    const { isLogin, roles, isAuthenticating } = useAppSelector(
      (state) => state.auth
    );
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (mounted) {
      if (isAuthenticating) return <div>권한 확인중..</div>;
      if (!isLogin) {
        addNotification("관리자 로그인이 필요합니다", "error");
        router.back();
      } else if (isLogin && !roles?.includes(ROLEADMIN)) {
        addNotification("관리자 권한이 없습니다", "error");
        router.back();
      }
      return <WrappedComponent {...props} />;
    }
    return null;
  }
  AuthenticatedComponent.displayName = "authenticated-component";
  return AuthenticatedComponent;
};

export default withAdmin;
