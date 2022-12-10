import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../hooks/useStore";
import useNotification from "../../hooks/useNotification";

import Cookies from "js-cookie";
import { API_BASE_URL } from "../../constants/url";
import axios from "axios";
import { addHours } from "../../utils/dateUtils";

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
        try {
          (async () => {
            const a = await axios.post(API_BASE_URL + "/users/refresh", null, {
              withCredentials: true,
            });
            if (a.data.success) {
              Cookies.set("Authorization", `Bearer ${a.data.access_token}`, {
                secure: true,
                sameSite: "None",
                expires: addHours(1),
              });
            }
          })();
        } catch (e) {
          addNotification(
            "인증이 만료되었습니다. 로그인이 필요합니다.",
            "error"
          );
          router.replace("/login");
        }
      }

      return <WrappedComponent {...props} />;
    }
    return null;
  }
  AuthenticatedComponent.displayName = "authenticated-component";
  return AuthenticatedComponent;
};

export default withAuth;
