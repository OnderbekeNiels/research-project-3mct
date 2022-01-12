import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import ContentBox from "../../components/contentBox";
import Container from "../../components/objects/container";
import { Head1 } from "../../components/objects/head";
import Header from "../../components/objects/header";
import Row from "../../components/objects/row";
import Post, { PostArgs } from "../../components/post";
import PostType from "../../models/post";
import { query } from "../../utils/fetch";
import { getPerformance, trace } from "firebase/performance";
import { perf } from "../../utils/firebase";
import ErrorMessageBox from "../../components/errorMessageBox";
import LoadingMessageBox from "../../components/loadingMessageBox";

const Home: NextPage = () => {
  const [posts, setPosts] = useState<PostType[] | undefined | null>(undefined);
  const [requestTime, setRequestTime] = useState<number>(0);

  const getPosts = async () => {


    // Code that you want to trace
    // ...
    try {
      const startTime = new Date().getTime();
      const posts: PostType[] = await query(
        `PostsAll`,
        `query PostsAll {
PostsAll {
  id
  answerCount
  votesCount
  body
  commentCount
  ownerUser {
    id
    displayName
    upVotes
    downVotes
    reputation
  }
  tags
  title
  viewCount
}}`
      );
      if (posts) {
        const travelTime = new Date().getTime() - startTime;
        setRequestTime(travelTime);
      }
      setPosts(posts);
    } catch (error) {
      setPosts(null);
    }

    
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Row>
        <Container>
          <Head1>
            Latest posts ({posts ? posts.length : 0}) - Request travel:{" "}
            {requestTime} ms
          </Head1>
          <div className="grid sm:gap-6 mt-6">
            {posts === null && <ErrorMessageBox />}
            {posts === undefined && <LoadingMessageBox />}
            {posts && posts.length < 0 && (
              <ContentBox>No posts found to display</ContentBox>
            )}
            {posts &&
              posts.length > 0 &&
              posts.map((p: PostType) => (
                <Post key={p.id.toString()} post={p as PostArgs}></Post>
              ))}
          </div>
        </Container>
      </Row>
    </>
  );
};

export default Home;
