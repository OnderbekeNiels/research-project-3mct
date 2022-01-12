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
import { useRecoilState } from "recoil";
import { requestState } from "../../utils/store";

const Home: NextPage = () => {
  const [posts, setPosts] = useState<PostType[] | undefined | null>(undefined);

  const [request, setRequest] = useRecoilState(requestState);

  const getPosts = async () => {
    const start = new Date().getTime();
    let dataSize: number = 0;

    try {
      const data: PostType[] = await query(
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
      dataSize = new TextEncoder().encode(JSON.stringify(data)).length / 1024;
      setPosts(data);
    } catch (error) {
      setPosts(null);
    }
    setRequest(() => {
      return {
        responseTime: new Date().getTime() - start,
        requestNestingLevel: 2,
        requestName: "PostsAll",
        responseSize: dataSize,
        description: "Using normal fetch api",
      };
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Row>
        <Container>
          <Head1>
            Latest posts ({posts ? posts.length : 0})
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
