import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

// css
import Loading from "../components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as IconSolid from "@fortawesome/free-solid-svg-icons";
import * as IconRegular from "@fortawesome/free-regular-svg-icons";
import { Container } from "react-bootstrap-v5";

function Home() {
  const router = useRouter();
  return (
    <Container fluid className="content">
      <Head>
        <title>Home</title>
      </Head>
      <div className="row">
        <div className="col">
          <h1>
            <FontAwesomeIcon icon={IconSolid.faDashboard} /> Dashboard{" "}
          </h1>
        </div>
      </div>
    </Container>
  );
}
Home.auth = true;

export default Home;
