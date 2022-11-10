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
import withAdmin from "../components/guard/withAdmin";

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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Notification />
        {getLayout(<Guard />)}
      </ThemeProvider>
      <ThemeProvider theme={theme}></ThemeProvider>
    </Provider>
  );
}

export default MyApp;
