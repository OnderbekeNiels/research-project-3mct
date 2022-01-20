import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import ContentBox from "../../components/contentBox";
import Container from "../../components/objects/container";
import { Head1 } from "../../components/objects/head";
import Row from "../../components/objects/row";
import Post, { PostArgs } from "../../components/post";
import PostType from "../../models/post";
import ErrorMessageBox from "../../components/errorMessageBox";
import LoadingMessageBox from "../../components/loadingMessageBox";
import { useRecoilState } from "recoil";
import { requestState } from "../../utils/store";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
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
          <div className="flex items-center justify-between">
          <Head1>Latest posts ({data ? data.PostsAll.length : 0})</Head1>
          <button onClick={()=> {router.push('/posts/create')}} className="flex space-x-2 rounded-md items-center justify-between p-2 bg-purple-600 border-2 border-purple-600 text-white hover:bg-purple-600/0 hover:text-purple-600 transition-all duration-300 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            <p>Create a post</p>
          </button>
          </div>
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
