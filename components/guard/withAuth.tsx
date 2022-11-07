/* eslint-disable react/display-name */
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useStore";

const withAuth = (
  WrappedComponent: React.ComponentType<Record<string, unknown>>
) => {
  function AuthenticatedComponent(props: Record<string, unknown>) {
    const router = useRouter();
    const { isLogin } = useAppSelector((state) => state.auth);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);
    //window가지고 장난치면 안된단다 얘야~=> window객체가 있냐/없냐에 따라 반환하는 거 달라짐 => hydrating error가 뜸
    // https://nextjs.org/docs/messages/react-hydration-error 참조
    if (mounted) {
      const accessToken = Cookies.get("Authorization");

      if (!accessToken) {
        window.alert("너 토큰없음!");
        router.replace("/");
      }

      return <WrappedComponent {...props} />;
    }
    return null;
  }
  AuthenticatedComponent.displayName = "authenticated-component";
  return AuthenticatedComponent;
};

export default withAuth;
