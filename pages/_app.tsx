import "../styles/globals.css";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../store/store";
import AuthGuard from "../components/guard/AuthGuard";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { getUserData } from "../store/slice/authSlice";
import Notification from "../components/common/Notification";

import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<T> = AppProps<T> & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout<{ authRequired: boolean }>) {
  useEffect(() => {
    store.dispatch(getUserData());
  }, []);

  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout page={page} />);

  const RequiredAuth = () =>
    Component.defaultProps?.authRequired ? (
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    ) : (
      <Component {...pageProps}></Component>
    );

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Notification />
        {getLayout(<RequiredAuth />)}
      </ThemeProvider>
      <ThemeProvider theme={theme}></ThemeProvider>
    </Provider>
  );
}

export default MyApp;
