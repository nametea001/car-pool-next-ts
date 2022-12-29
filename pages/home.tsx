import type { NextPageWithLayout } from "./_app";
import { useRouter } from "next/router";

// Layouy
import Layout from "../components/layout";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Home: NextPageWithLayout = () => {
  const { data: session, status }: any = useSession();
  const router = useRouter();

  return (
    <div className="container-fluid p-0">
      <h1>test</h1>
    </div>
  );
};

export default Home;
