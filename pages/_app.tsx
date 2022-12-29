import "../styles/globals.css";
import Layout from "../components/layout";
import "../styles/layout.css";
import "bootstrap/dist/css/bootstrap.min.css";

// tool
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // const getLayout = Component.getLayout ?? ((page) => page);
  // return getLayout(
  //   <SessionProvider session={session}>
  //     <Component {...pageProps} />
  //   </SessionProvider>
  // );

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
