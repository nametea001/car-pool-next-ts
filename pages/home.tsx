import type { NextPageWithLayout } from "./_app";
import { useRouter } from "next/router";

// Layouy
import Layout from "../components/layout";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

// const Home: NextPageWithLayout = () => {
//   const { data: session, status } = useSession();
//   const username = session?.user.username;
//   return (
//     <div className="container-fluid p-0">
//       <h1>test</h1>
//     </div>
//   );
// };

// Home.getLayout = function getLayout(Home: ReactElement) {
//   return <Layout title="Home">{Home} </Layout>;
// };

const Home: NextPageWithLayout = () => {
  const { data: session, status }: any = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (!session?.user) {
  //     router.push("/");
  //   }
  // });
  return (
    <Layout title="Home" userName={session?.user.username ?? "NoUser"}>
      <div className="container-fluid p-0">
        <h1>test</h1>
      </div>
    </Layout>
  );
};

export default Home;
