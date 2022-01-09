import type { NextPage } from "next";
import React from "react";
import Container from "../components/objects/container";
import { Head1 } from "../components/objects/head";
import Header from "../components/objects/header";
import Row from "../components/objects/row";
import Post from "../components/post";

const Home: NextPage = () => {
  return (
    <>
      <Row>
        <Container>
          <Head1>Latest posts</Head1>
          <div className="grid sm:gap-6 mt-6">
            <Post></Post>
            <Post></Post>
            <Post></Post>
          </div>
        </Container>
      </Row>
    </>
  );
};

export default Home;
