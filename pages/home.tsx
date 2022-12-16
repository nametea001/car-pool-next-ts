import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
// Layouy
import Layout from "../components/layout";

const Home: NextPageWithLayout = () => {
  return (
    <div className="container-fluid p-0">
      <h1>test</h1>
    </div>
  );
};

Home.getLayout = function getLayout(Home: ReactElement) {
  return <Layout title="Home">{Home}</Layout>;
};

export default Home;
