import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Container from "../components/objects/container";
import { Head1 } from "../components/objects/head";
import Header from "../components/objects/header";
import Row from "../components/objects/row";
import Post, { PostType } from "../components/post";
import { query } from "../utils/fetch";

const Home: NextPage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const getPosts = async () => {
    const posts: PostType[] = await query(
      `PostsAll`,
      `query PostsAll {
  PostsAll {
    id
    answerCount
    body
    commentCount
    ownerUser {
      displayName
    }
    tags
    title
    viewCount
}}`
    );
    setPosts(posts)
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Row>
        <Container>
          <Head1>Latest posts ({posts.length})</Head1>
          <div className="grid sm:gap-6 mt-6">
            {posts.map((p: PostType) => (
              <Post key={p.id.toString()} post={p}></Post>
            ))}
          </div>
        </Container>
      </Row>
    </>
  );
};

export default Home;
