import "../styles/globals.css";
import { useEffect } from "react";
import store from "../store/store";
import { Provider } from "react-redux";
import { getUserData } from "../store/slice/authSlice";

import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import DefaultLayout from "../components/layouts/DefaultLayout";
import Notification from "../components/common/Notification";

import withAuth from "../components/guard/withAuth";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

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

  const RequiredAuth = () => {
    if (Component.defaultProps?.authRequired) {
      const AuthenticatedComponent = withAuth(Component);
      return <AuthenticatedComponent {...pageProps} />;
    }
    return <Component {...pageProps} />;
  };

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
