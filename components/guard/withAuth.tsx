import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../hooks/useStore";
import useNotification from "../../hooks/useNotification";

import Cookies from "js-cookie";
import refreshAccessToken from "../../api/refreshAPI";

const withAuth = (
  WrappedComponent: React.ComponentType<Record<string, unknown>>
) => {
  function AuthenticatedComponent(props: Record<string, unknown>) {
    const router = useRouter();
    const addNotification = useNotification();
    const { isLogin } = useAppSelector((state) => state.auth);
    const [mounted, setMounted] = useState(false);
    const accessToken = Cookies.get("Authorization");

    useEffect(() => {
      setMounted(true);
    }, []);

    if (mounted) {
      if (!accessToken) {
        (async () => {
          const successRefresh = await refreshAccessToken();
          if (!successRefresh) {
            //리프레시마저도 실패!
            addNotification(
              "인증이 만료되었습니다. 로그인이 필요합니다.",
              "error"
            );
            router.replace("/login");
          }
        })();
      }

      return <WrappedComponent {...props} />;
    }
    return null;
  }
  AuthenticatedComponent.displayName = "authenticated-component";
  return AuthenticatedComponent;
};

export default withAuth;
