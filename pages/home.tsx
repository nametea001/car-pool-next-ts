import { useRouter } from "next/router";

// Layouy
import Layout from "../components/layout";
import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import { Container } from "react-bootstrap-v5";

const Home = () => {
  const router = useRouter();
  return <Container fluid></Container>;
};
Home.auth = true;

export default Home;
