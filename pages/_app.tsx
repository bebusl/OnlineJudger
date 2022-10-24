import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import DefaultLayout from "../components/layouts/DefaultLayout";
import store from "../store/store";
import AuthGuard from "../components/guard/AuthGuard";
import { useEffect } from "react";
import { getUserData } from "../store/slice/authSlice";

function MyApp({ Component, pageProps }: AppProps<{ authRequired: boolean }>) {
  const requiredAuth = Component.defaultProps?.authRequired;
  useEffect(() => {
    store.dispatch(getUserData());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <DefaultLayout>
          {requiredAuth ? (
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
          ) : (
            <Component {...pageProps} />
          )}
        </DefaultLayout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
