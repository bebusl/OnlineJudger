import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../hooks/useStore";
import useNotification from "../../hooks/useNotification";

import Cookies from "js-cookie";

import { ROLEADMIN } from "../../constants/role";

const withAdmin = (
  WrappedComponent: React.ComponentType<Record<string, unknown>>
) => {
  function AuthenticatedComponent(props: Record<string, unknown>) {
    const router = useRouter();
    const addNotification = useNotification();
    const { isLogin, roles } = useAppSelector((state) => state.auth);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (mounted) {
      const accessToken = Cookies.get("Authorization");

      if (!accessToken) {
        addNotification("로그인이 필요합니다.", "error");
        router.replace("/");
      }
      if (isLogin && !roles.includes(ROLEADMIN)) {
        addNotification("관리자 권한이 없습니다.", "error");
        router.replace("/");
      }
      return <WrappedComponent {...props} />;
    }
    return null;
  }
  AuthenticatedComponent.displayName = "authenticated-component";
  return AuthenticatedComponent;
};

export default withAdmin;