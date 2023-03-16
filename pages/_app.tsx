import "../styles/globals.css";
import React, { useEffect } from "react";
import store from "../store/store";
import { Provider } from "react-redux";
import { getUserData } from "../store/slice/authSlice";

import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import DefaultLayout from "../components/layouts/DefaultLayout";
import Notification from "../components/common/Notification/Notification";

import withAuth from "../components/guard/withAuth";
import withAdmin from "../components/guard/withAdmin";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import MetaTags from "../components/common/MetaTags";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<T> = AppProps<T> & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout<{ authRequired: boolean; adminOnly: boolean }>) {
  useEffect(() => {
    store.dispatch(getUserData());
  }, []);

  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout page={page} />);

  const Guard = () => {
    if (Component.defaultProps?.authRequired) {
      const AuthenticatedComponent = withAuth(Component);
      return <AuthenticatedComponent {...pageProps} />;
    } else if (Component.defaultProps?.adminOnly) {
      const AdminComponent = withAdmin(Component);
      return <AdminComponent {...pageProps} />;
    }
    return <Component {...pageProps} />;
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <MetaTags
        title="YOONLEEVERSE OJ"
        description="코딩 테스트 대비. 문제를 풀다 막히면 다른 사람들의 풀이도 참고해보세요!"
        url="https://uni.yoonleeverse.com/problem?page=1"
      />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Notification />
          {getLayout(<Guard />)}
        </ThemeProvider>
        <ThemeProvider theme={theme}></ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
