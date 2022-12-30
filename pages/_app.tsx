import "../styles/globals.css";
import Layout from "../components/layout";
import "../styles/layout.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getToken } from "next-auth/jwt";
// tool
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { SessionProvider, useSession } from "next-auth/react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

// type AppPropsWithLayout = AppProps & {
//   Component: NextPageWithLayout;
//   // Component: NextPageWithLayout;
// };

type AppPropsWithLayout = AppProps & {
  Component: any;
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // const getLayout = Component.getLayout ?? ((page) => page);
  // <SessionProvider session={session}>
  //   getLayout(
  //   <Component {...pageProps} />)
  // </SessionProvider>;
  // return (
  //   <SessionProvider session={session}>
  //     <Layout>
  //       <Component {...pageProps} />
  //     </Layout>
  //   </SessionProvider>
  // );
  return (
    <>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        {Component.auth ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </>
  );

  // return (
  //   <>
  //     {Component.auth ? (
  //       <Layout>
  //         <SessionProvider session={session} refetchInterval={5 * 60}>
  //           <Component {...pageProps} />
  //         </SessionProvider>
  //       </Layout>
  //     ) : (
  //       <Component {...pageProps} />
  //     )}
  //   </>
  // );
}
