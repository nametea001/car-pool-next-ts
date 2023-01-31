import "../styles/globals.css";
import Layout from "../components/layout";
import "../styles/layout.css";
import "bootstrap/dist/css/bootstrap.min.css";

// datatable
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

// tool
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { SessionProvider, useSession } from "next-auth/react";
import { SSRProvider } from "react-bootstrap";

// export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
//   getLayout?: (page: ReactElement) => ReactNode;
// };

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
          <SSRProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SSRProvider>
        ) : (
          <SSRProvider>
            <Component {...pageProps} />
          </SSRProvider>
        )}
      </SessionProvider>
    </>
  );
}
