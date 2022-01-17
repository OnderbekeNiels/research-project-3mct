import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
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
import { gql, useQuery } from "@apollo/client";

const Home: NextPage = () => {
  // ! State
  const [request, setRequest] = useRecoilState(requestState);

  // ! werkt niet
  const queryGQL = `query PostsAll {
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
}}`;

  // ! werkt wel
  const GETALLPOSTS = gql`
    query PostsAll {
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
      }
    }
  `;
  const { loading, error, data } = useQuery(GETALLPOSTS, {
    fetchPolicy: "no-cache",
  });

  // ! Lifecycle

  const [start, setStart] = useState(new Date().getTime());

  useEffect(() => {
    if (data != undefined) {
      setRequest((d) => {
        return {
          ...d,
          requestName: "PostsAll",
          requestNestingLevel: 2,
          responseSize:
            new TextEncoder().encode(JSON.stringify(data)).length / 1024,
          responseTime: new Date().getTime() - start,
        };
      });
    }
  }, [data]);

  return (
    <>
      <Row>
        <Container>
          <Head1>Latest posts ({data ? data.PostsAll.length : 0})</Head1>
          {/* <Head1>Latest posts ({posts ? posts.length : 0})</Head1> */}
          <div className="grid gap-4 sm:gap-6 mt-6">
            {/* ! Apollo Client way */}
            {error && <ErrorMessageBox />}
            {loading && <LoadingMessageBox />}
            {data && data.PostsAll.length < 0 && (
              <ContentBox>No posts found to display</ContentBox>
            )}
            {data &&
              data.PostsAll.length > 0 &&
              data.PostsAll.map((p: PostType) => (
                <Post key={p.id.toString()} post={p as PostArgs}></Post>
              ))}
          </div>
        </Container>
      </Row>
    </>
  );
};

export default Home;
