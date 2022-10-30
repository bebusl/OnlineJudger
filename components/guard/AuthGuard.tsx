import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../../store/useStore";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitializing, setIsInitializing] = useState(true);
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push("/");
    }
    setIsInitializing(false);
  }, []);

  if (!isInitializing && isLogin) return <>{children}</>;
  return <div>인증 중</div>;
};

export default AuthGuard;
